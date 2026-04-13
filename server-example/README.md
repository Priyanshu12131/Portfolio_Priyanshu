# Portfolio Backend Server

Express.js + MongoDB backend for the portfolio website.

## 📦 Installation

1. **Navigate to server directory:**
```bash
cd server-example
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp ../server.env.example .env
```

4. **Edit .env file and add your configuration:**
   - MongoDB URI (local or Atlas)
   - Email credentials (if using email notifications)
   - CORS origin (your frontend URL)

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB

Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)

Start MongoDB:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

Use in .env:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### Option 2: MongoDB Atlas (Cloud)

1. Create free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and add to .env

## 📁 File Structure Setup

Create required directories:
```bash
mkdir -p public/cv
```

Add your resume files to `public/cv/`:
- `resume.pdf` - Your resume in PDF format
- `resume.docx` - Your resume in Word format

## 🚀 Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

Server will start on `http://localhost:5000`

## 🧪 Testing the API

### Health Check:
```bash
curl http://localhost:5000/api/health
```

### Submit Contact Form:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, this is a test message!"
  }'
```

### Download CV:
```bash
curl http://localhost:5000/api/download-cv?format=pdf -o resume.pdf
curl http://localhost:5000/api/download-cv?format=docx -o resume.docx
```

### Get CV Info:
```bash
curl http://localhost:5000/api/cv-info
```

## 📧 Email Configuration (Optional)

To enable email notifications:

### Gmail Setup:
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Add to .env:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
```

### Other Email Providers:
Update EMAIL_HOST and EMAIL_PORT in .env:
- **Outlook**: smtp-mail.outlook.com (Port 587)
- **Yahoo**: smtp.mail.yahoo.com (Port 587)
- **SendGrid**: smtp.sendgrid.net (Port 587)

## 🌐 Deployment

### Render.com (Recommended)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repository
5. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
6. Add environment variables (from .env)
7. Deploy

### Railway.app

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add environment variables
4. Deploy automatically

### Heroku

```bash
heroku create portfolio-backend
heroku addons:create mongolab:sandbox
git push heroku main
heroku config:set $(cat .env | sed '/^$/d; /^#/d')
```

## 🔒 Security Notes

✅ **Environment Variables**: Never commit .env file
✅ **Rate Limiting**: Implemented on all API routes
✅ **CORS**: Configured to allow only specific origins
✅ **Helmet**: Security headers enabled
✅ **Input Validation**: Using express-validator
✅ **MongoDB Injection**: Mongoose provides protection

## 📝 API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contact` - Get all submissions (admin)
- **GET** `/api/contact/:id` - Get specific submission
- **DELETE** `/api/contact/:id` - Delete submission (admin)

### CV Download
- **GET** `/api/download-cv?format=pdf` - Download PDF resume
- **GET** `/api/download-cv?format=docx` - Download Word resume
- **GET** `/api/cv-info` - Get CV file information

### System
- **GET** `/api/health` - Health check

## 🔗 Connect Frontend

After deploying backend, update the frontend:

In `/src/app/components/Contact.tsx`:
```typescript
const response = await fetch('https://your-backend.com/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

In `/src/app/components/Hero.tsx`:
```typescript
const response = await fetch(`https://your-backend.com/api/download-cv?format=${format}`);
```

## 📊 Monitoring

View server logs:
```bash
# Development
npm run dev

# Production (if using PM2)
pm2 logs portfolio-backend
```

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- Check network access (Atlas IP whitelist)

**Email Not Sending:**
- Verify email credentials
- Check App Password (not regular password)
- Ensure 2FA is enabled

**CORS Errors:**
- Add frontend URL to CORS_ORIGIN in .env
- Restart server after changing .env

**Port Already in Use:**
- Change PORT in .env
- Kill process using port: `lsof -ti:5000 | xargs kill`

## 📚 Documentation

- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemailer](https://nodemailer.com/)

## 🤝 Support

For issues, check the main [README.md](../README.md) and [BACKEND_INTEGRATION.md](../BACKEND_INTEGRATION.md)

---

**Built with Express.js, MongoDB, and Node.js**
