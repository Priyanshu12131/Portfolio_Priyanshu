# 🚀 Priyanshu Kumar — Portfolio

A full-stack personal portfolio website built with **React** (frontend) and **Node.js/Express** (backend), featuring a contact form, resume download system, and MongoDB integration.

🔗 **Live Demo:** [(https://portfolio-priyanshu1.vercel.app/)]

---

## 📁 Project Structure

```
Portfolio_Priyanshu/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Hero, Contact, Projects, Avatar, etc.
│   │   │   └── Portfolio.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env                 # VITE_API_URL=<your backend URL>
│   ├── package.json
│   └── vite.config.js
│
├── server/                  # Node.js/Express backend
│   ├── routes/
│   │   └── download.js
│   ├── resume/              # Place your resume PDF/DOCX here for auto-seed
│   ├── server.js
│   ├── .env                 # See Environment Variables section below
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ✨ Features

- **Typing animation** — animated role carousel (VLSI Engineer, Full Stack Developer)
- **Contact form** — saves messages to MongoDB with AES-256 encryption + sends email via Gmail
- **Resume download** — PDF & DOCX stored in MongoDB GridFS, downloadable from the Hero section
- **Rate limiting** — API protected against abuse
- **CORS-secured** — only whitelisted origins can access the API
- **Fully responsive** — mobile-friendly layout with Framer Motion animations

---

## 🛠️ Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, Vite, Framer Motion, Lucide   |
| Backend   | Node.js, Express.js                     |
| Database  | MongoDB Atlas + GridFS (file storage)   |
| Email     | Nodemailer + Gmail App Password         |
| Hosting   | Vercel (frontend + backend)             |

---

## ⚙️ Local Setup

### Prerequisites

- Node.js >= 18
- npm >= 9
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords) enabled

---

### 1. Clone the Repository

```bash
git clone https://github.com/Priyanshu12131/Portfolio_Priyanshu.git
cd Portfolio_Priyanshu
```

---

### 2. Setup the Backend (server/)

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio

GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password

# Exactly 32 characters
ENCRYPTION_KEY=your_32_char_secret_key_here!!!!

# Comma-separated frontend origins
CORS_ORIGIN=http://localhost:5173,https://your-frontend.vercel.app

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

PORT=7000

ADMIN_KEY=YourSecretAdminKey
```

**Seed your resume (optional):**
Place your `resume.pdf` and/or `resume.docx` inside `server/resume/` — they will be auto-uploaded to MongoDB GridFS on first server start.

Start the backend:

```bash
npm start
# or for development with auto-reload:
npx nodemon server.js
```

Backend runs at: `http://localhost:7000`

---

### 3. Setup the Frontend (client/)

```bash
cd ../client
npm install
```

Create a `.env` file inside `/client`:

```env
VITE_API_URL=http://localhost:7000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### 4. Upload Resume Manually (if not using auto-seed)

Run this in PowerShell after the backend is running:

```powershell
# Upload PDF
curl.exe -X POST http://localhost:7000/api/resume/upload `
  -H "x-admin-key: YourSecretAdminKey" `
  -F "resume=@C:\path\to\resume.pdf"

# Upload DOCX
curl.exe -X POST http://localhost:7000/api/resume/upload `
  -H "x-admin-key: YourSecretAdminKey" `
  -F "resume=@C:\path\to\resume.docx"
```

---

## 🌐 API Endpoints

| Method | Endpoint                        | Description                        |
|--------|---------------------------------|------------------------------------|
| GET    | `/api/health`                   | Health check                       |
| POST   | `/api/contact`                  | Submit contact form                |
| GET    | `/api/resume/download/:format`  | Download resume (`pdf` or `docx`)  |
| POST   | `/api/resume/upload`            | Upload/replace resume (admin only) |
| GET    | `/api/resume/info`              | Check stored resume metadata       |

---

## 🚀 Deployment (Vercel)

### Backend
1. Push your `server/` folder to GitHub
2. Import the repo in [Vercel](https://vercel.com) → set **Root Directory** to `server`
3. Add all environment variables from your `.env` under **Settings → Environment Variables**
4. Deploy

### Frontend
1. Import the repo in Vercel → set **Root Directory** to `client`
2. Add `VITE_API_URL=https://your-backend.vercel.app` as an environment variable
3. Deploy

---

## 🔒 Security Notes

- **Never commit your `.env` file** — it is excluded via `.gitignore`
- Use a Gmail **App Password**, not your real Gmail password
- The `ENCRYPTION_KEY` must be exactly 32 characters
- The `ADMIN_KEY` protects the resume upload endpoint

---

## 📄 License

This project is for personal portfolio use. Feel free to use it as inspiration for your own portfolio.

---

## 👤 Author

**Priyanshu Kumar**
- GitHub: [@Priyanshu12131](https://github.com/Priyanshu12131)
- LinkedIn: [priyanshu-kumar](https://www.linkedin.com/in/priyanshu-kumar-4454053b2)
- Email: priyanshuk7839@gmail.com
