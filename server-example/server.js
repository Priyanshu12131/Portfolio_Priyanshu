const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const fs = require('fs');

dotenv.config();

const app = express();

// ─── Encryption Config ────────────────────────────────────────────────────────
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your_32_char_secret_key_here!!!!';
const IV_LENGTH = 16;

function encryptMessage(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// ─── Security ────────────────────────────────────────────────────────────────
app.use(helmet());

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
});
app.use('/api/', limiter);

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn(`❌ CORS blocked for origin: ${origin}`);
      return callback(new Error('CORS policy error'), false);
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', allowedOrigins[0]);
  }
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// ─── MongoDB Connection ───────────────────────────────────────────────────────
let isMongoConnected = false;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    isMongoConnected = true;
    console.log('✅ MongoDB connected successfully');
    await seedResumesFromFolder();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    isMongoConnected = false;
  });

mongoose.connection.on('connected', () => { isMongoConnected = true; });
mongoose.connection.on('disconnected', () => { isMongoConnected = false; });

// ─── GridFS Helpers ───────────────────────────────────────────────────────────
function getBucket() {
  if (!isMongoConnected || !mongoose.connection.db) {
    throw new Error('Database not connected. Please try again in a moment.');
  }
  return new GridFSBucket(mongoose.connection.db, { bucketName: 'resumes' });
}

async function deleteExistingFile(bucket, filename) {
  const files = await bucket.find({ filename }).toArray();
  await Promise.all(files.map(f => bucket.delete(f._id)));
}

// ─── Auto-seed: reads /resume folder and uploads to GridFS ───────────────────
async function seedResumesFromFolder() {
  try {
    const resumeDir = path.join(__dirname, 'resume');
    if (!fs.existsSync(resumeDir)) {
      console.log('ℹ️  No /resume folder found, skipping auto-seed.');
      return;
    }

    const fileMap = { pdf: null, docx: null };
    for (const entry of fs.readdirSync(resumeDir)) {
      const ext = path.extname(entry).toLowerCase().replace('.', '');
      if (ext === 'pdf' && !fileMap.pdf) fileMap.pdf = entry;
      if (ext === 'docx' && !fileMap.docx) fileMap.docx = entry;
    }

    const bucket = getBucket();

    for (const [ext, filename] of Object.entries(fileMap)) {
      if (!filename) {
        console.log(`⚠️  No ${ext.toUpperCase()} in /resume folder.`);
        continue;
      }

      const existing = await bucket.find({ filename: `resume.${ext}` }).toArray();
      if (existing.length > 0) {
        console.log(`ℹ️  resume.${ext} already in MongoDB — skipping seed.`);
        continue;
      }

      const filePath = path.join(resumeDir, filename);
      const mimeType =
        ext === 'pdf'
          ? 'application/pdf'
          : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

      await new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(`resume.${ext}`, {
          metadata: {
            originalName: filename,
            mimetype: mimeType,
            uploadedAt: new Date(),
          },
        });
        fs.createReadStream(filePath).pipe(uploadStream);
        uploadStream.on('finish', () => {
          console.log(`✅ Seeded resume.${ext} → GridFS`);
          resolve();
        });
        uploadStream.on('error', reject);
      });
    }
  } catch (err) {
    console.log('ℹ️ Seed skipped:', err.message);
  }
}

// ─── Multer (memory) for upload endpoint ─────────────────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Only PDF and DOCX allowed'), false);
  },
});

// ─── Contact Schema & Model ───────────────────────────────────────────────────
const contactSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true, maxlength: 100 },
    email:   { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
const Contact = mongoose.model('Contact', contactSchema);

// ─── Nodemailer Transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: '🚀 Backend is running!', dbConnected: isMongoConnected });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    dbConnected: isMongoConnected,
    timestamp: new Date().toISOString()
  });
});

// ─── Contact Route ────────────────────────────────────────────────────────────
app.options('/api/contact', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN?.split(',')[0] || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: 'All fields are required' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ error: 'Invalid email format' });

  if (!isMongoConnected)
    return res.status(503).json({ error: 'Database not available. Please try again shortly.' });

  try {
    const encryptedMessage = encryptMessage(message);
    const newContact = new Contact({ name, email, message: encryptedMessage });
    await newContact.save();
    console.log('✅ Contact saved to MongoDB:', newContact._id);

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `📩 New Message from ${name} — Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background: #f9f9f9;">
          <h2 style="color: #4f46e5; margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color: #888; font-size: 13px; margin-top: 0;">Received from your portfolio website</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>💬 Message:</strong></p>
          <div style="background: #fff; border-left: 4px solid #4f46e5; padding: 15px; border-radius: 5px; color: #333;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="color: #aaa; font-size: 12px;">Reply directly to respond to ${name}.</p>
        </div>
      `,
    });
    console.log('✅ Email sent successfully');
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Contact route error:', error);
    // Returning the real error message temporarily so we can find the cause
    res.status(500).json({ error: `Server Error: ${error.message}` });
  }
});

// ─── Resume Upload ────────────────────────────────────────────────────────────
app.post('/api/resume/upload', upload.single('resume'), async (req, res) => {
  const adminKey = process.env.ADMIN_KEY;
  if (adminKey && req.headers['x-admin-key'] !== adminKey)
    return res.status(401).json({ error: 'Unauthorized' });
  if (!req.file)
    return res.status(400).json({ error: 'No file provided' });

  try {
    const bucket = getBucket();
    const ext      = req.file.mimetype === 'application/pdf' ? 'pdf' : 'docx';
    const filename = `resume.${ext}`;

    await deleteExistingFile(bucket, filename);
    await new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(filename, {
        metadata: {
          originalName: req.file.originalname,
          mimetype: req.file.mimetype,
          uploadedAt: new Date(),
        },
      });
      uploadStream.on('error', reject);
      uploadStream.on('finish', resolve);
      uploadStream.end(req.file.buffer);
    });

    console.log(`✅ Resume replaced: ${filename}`);
    res.status(200).json({ success: true, message: `${filename} uploaded successfully` });
  } catch (err) {
    console.error('❌ Resume upload error:', err);
    res.status(500).json({ error: err.message || 'Upload failed.' });
  }
});

// ─── Resume Download ──────────────────────────────────────────────────────────
app.get('/api/resume/download/:format', async (req, res) => {
  const { format } = req.params;
  if (!['pdf', 'docx'].includes(format))
    return res.status(400).json({ error: 'Invalid format. Use pdf or docx.' });

  const filename = `resume.${format}`;
  const mimeType =
    format === 'pdf'
      ? 'application/pdf'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  try {
    const bucket = getBucket();
    const files  = await bucket.find({ filename }).toArray();
    if (!files.length)
      return res.status(404).json({ error: `No ${format.toUpperCase()} resume found. Please upload one first.` });

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="Priyanshu_Kumar_Resume.${format}"`);
    bucket.openDownloadStreamByName(filename).pipe(res);
  } catch (err) {
    console.error('❌ Resume download error:', err);
    res.status(500).json({ error: err.message || 'Download failed.' });
  }
});

// ─── Resume Info ──────────────────────────────────────────────────────────────
app.get('/api/resume/info', async (req, res) => {
  try {
    const bucket = getBucket();
    const files  = await bucket.find({ filename: { $in: ['resume.pdf', 'resume.docx'] } }).toArray();
    res.json({
      resumes: files.map(f => ({
        format:     f.filename.split('.').pop(),
        size:       f.length,
        uploadedAt: f.metadata?.uploadedAt || f.uploadDate,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Could not fetch resume info.' });
  }
});

// ─── Error Handlers ───────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is in use.`);
  }
});

module.exports = app;