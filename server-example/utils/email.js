const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email notification for contact form submission
async function sendEmailNotification(name, email, message) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: '📧 New Portfolio Contact Form Submission',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 10px;
            }
            .header {
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              padding: 20px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .field {
              margin-bottom: 20px;
            }
            .field-label {
              font-weight: bold;
              color: #6366f1;
              margin-bottom: 5px;
            }
            .field-value {
              padding: 10px;
              background: #f3f4f6;
              border-radius: 5px;
              border-left: 3px solid #6366f1;
            }
            .message-box {
              padding: 15px;
              background: #f3f4f6;
              border-radius: 5px;
              border-left: 3px solid #8b5cf6;
              white-space: pre-wrap;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #6c757d;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">👤 Name:</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">📧 Email:</div>
                <div class="field-value">
                  <a href="mailto:${email}">${email}</a>
                </div>
              </div>
              
              <div class="field">
                <div class="field-label">💬 Message:</div>
                <div class="message-box">${message}</div>
              </div>
              
              <div class="footer">
                <p>Received at: ${new Date().toLocaleString()}</p>
                <p>Reply to this message by emailing <a href="mailto:${email}">${email}</a></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

Received at: ${new Date().toLocaleString()}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return info;

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
}

// Send auto-reply to the person who submitted the form
async function sendAutoReply(recipientEmail, recipientName) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Your Name" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: 'Thank you for contacting me!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              padding: 30px;
              border-radius: 10px;
              text-align: center;
            }
            .content {
              padding: 30px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Reaching Out!</h1>
            </div>
            <div class="content">
              <p>Hi ${recipientName},</p>
              <p>Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
              <p>I typically respond within 24-48 hours.</p>
              <p>Best regards,<br>Your Name</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply sent successfully:', info.messageId);
    return info;

  } catch (error) {
    console.error('❌ Auto-reply failed:', error);
    throw error;
  }
}

module.exports = {
  sendEmailNotification,
  sendAutoReply
};
