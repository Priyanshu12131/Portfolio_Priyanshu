const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// GET /api/download-cv?format=pdf or docx
router.get('/download-cv', (req, res) => {
  const { format } = req.query;

  // Validate format
  if (!format || !['pdf', 'docx'].includes(format.toLowerCase())) {
    return res.status(400).json({ 
      error: 'Invalid format. Please specify format=pdf or format=docx' 
    });
  }

  // Define file paths
  const files = {
    pdf: path.join(__dirname, '..', 'public', 'cv', 'resume.pdf'),
    docx: path.join(__dirname, '..', 'public', 'cv', 'resume.docx')
  };

  const filePath = files[format.toLowerCase()];

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ 
      error: `CV file not found. Please add resume.${format} to server/public/cv/` 
    });
  }

  // Get file stats for logging
  const stats = fs.statSync(filePath);
  console.log(`📥 CV Download: ${format.toUpperCase()} - ${(stats.size / 1024).toFixed(2)} KB`);

  // Set response headers
  const fileName = `John_Doe_Resume.${format}`;
  res.setHeader('Content-Type', format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Length', stats.size);

  // Send file
  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error('Download error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to download file' });
      }
    }
  });
});

// GET /api/cv-info - Get CV file information without downloading
router.get('/cv-info', (req, res) => {
  const cvPath = path.join(__dirname, '..', 'public', 'cv');
  
  const fileInfo = {
    pdf: null,
    docx: null
  };

  // Check PDF
  const pdfPath = path.join(cvPath, 'resume.pdf');
  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    fileInfo.pdf = {
      available: true,
      size: `${(stats.size / 1024).toFixed(2)} KB`,
      lastModified: stats.mtime
    };
  }

  // Check DOCX
  const docxPath = path.join(cvPath, 'resume.docx');
  if (fs.existsSync(docxPath)) {
    const stats = fs.statSync(docxPath);
    fileInfo.docx = {
      available: true,
      size: `${(stats.size / 1024).toFixed(2)} KB`,
      lastModified: stats.mtime
    };
  }

  res.json({ success: true, data: fileInfo });
});

module.exports = router;
