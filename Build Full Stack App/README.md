<<<<<<< HEAD
# Modern Portfolio Website - MERN Stack Ready

A stunning, fully animated personal portfolio website built with React, designed to connect with a MERN stack backend. Features custom CSS styling, smooth animations, and all the sections needed to showcase your professional work.

## 🌟 Features

### ✨ Fully Implemented
- **Animated Hero Section** with typewriter effect and CTA buttons
- **Interactive Animated Avatar** that responds to user interactions
- **Smooth Navigation** with active section detection and scroll effects
- **About Me Section** with professional bio and current status
- **Skills Showcase** with animated circular progress indicators
- **Projects Portfolio** with filterable project cards and hover effects
- **Education & Experience Timeline** with animated vertical timeline
- **Certifications & Achievements** gallery with hover animations
- **Functional Contact Form** ready for backend integration
- **CV/Resume Download** buttons (PDF and DOCX formats)
- **Dark/Light Mode Toggle** with smooth transitions
- **Fully Responsive Design** - works on mobile, tablet, and desktop

### 🎨 Design Features
- Custom CSS styling (no Tailwind CSS as per requirements)
- CSS Modules for scoped styling
- Motion (Framer Motion) for smooth animations
- Scroll-triggered animations using Intersection Observer
- Professional gradient color scheme
- Interactive hover effects throughout

### 🔄 Animations
- Typewriter effect on hero section
- Animated circular skill progress bars
- Scroll-triggered fade-in and slide-up animations
- Interactive avatar with hover states
- Smooth section transitions
- Animated timeline items
- Card hover effects with transformations

## 🚀 Tech Stack

### Frontend (Implemented)
- **React 18.3.1** - Modern React with hooks
- **React Router 7.13.0** - Client-side routing
- **Motion 12.23.24** - Advanced animations
- **TypeScript** - Type-safe code
- **CSS Modules** - Scoped styling
- **Vite** - Fast build tool
- **Lucide React** - Beautiful icons

### Backend (Ready for Integration)
- **Node.js + Express.js** - REST API server
- **MongoDB + Mongoose** - Database and ODM
- **Nodemailer** (optional) - Email notifications
- See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for complete setup guide

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── About.tsx & .module.css
│   │   │   ├── Avatar.tsx & .module.css
│   │   │   ├── Certifications.tsx & .module.css
│   │   │   ├── Contact.tsx & .module.css
│   │   │   ├── Hero.tsx & .module.css
│   │   │   ├── Navigation.tsx & .module.css
│   │   │   ├── Projects.tsx & .module.css
│   │   │   ├── Skills.tsx & .module.css
│   │   │   ├── ThemeToggle.tsx & .module.css
│   │   │   └── Timeline.tsx & .module.css
│   │   ├── styles/
│   │   │   └── Portfolio.module.css
│   │   ├── App.tsx
│   │   ├── Portfolio.tsx
│   │   └── routes.tsx
│   └── styles/
│       ├── index.css (theme variables)
│       ├── fonts.css
│       ├── tailwind.css
│       └── theme.css
├── BACKEND_INTEGRATION.md
├── README.md
└── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- Git

### Frontend Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Start development server**
```bash
npm run build
```

The app will be available at the preview URL shown in your terminal.

### Backend Setup (Optional)

See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for detailed instructions on setting up the Express.js backend with MongoDB.

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`/src/app/components/Hero.tsx`)
   - Change name, role, and tagline
   - Update typewriter text

2. **About Section** (`/src/app/components/About.tsx`)
   - Update bio, location, and status
   - Replace profile image URL

3. **Skills Section** (`/src/app/components/Skills.tsx`)
   - Modify skill categories and percentages
   - Update skill icons

4. **Projects Section** (`/src/app/components/Projects.tsx`)
   - Add your projects with descriptions
   - Update GitHub and live demo URLs
   - Change project images

5. **Timeline Section** (`/src/app/components/Timeline.tsx`)
   - Update education and work experience
   - Modify dates and descriptions

6. **Certifications Section** (`/src/app/components/Certifications.tsx`)
   - Add your certifications and achievements
   - Update credential URLs

7. **Contact Section** (`/src/app/components/Contact.tsx`)
   - Update email, phone, and location
   - Change social media links

### Color Scheme

Update theme colors in `/src/styles/index.css`:

```css
:root[data-theme="dark"] {
  --accent-primary: #818cf8;     /* Primary accent color */
  --accent-secondary: #a78bfa;   /* Secondary accent color */
  --accent-gradient: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
}
```

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Backend Deployment (Render/Railway)

1. Push your backend code to GitHub
2. Create a new web service on Render or Railway
3. Connect your repository
4. Set environment variables (MONGODB_URI, etc.)
5. Deploy

### Important: Update API URLs

After deploying backend, update the API URLs in:
- `/src/app/components/Contact.tsx`
- `/src/app/components/Hero.tsx`

Replace `http://localhost:5000` with your production backend URL.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (< 640px)
- 📲 Tablets (640px - 968px)
- 💻 Desktops (> 968px)

## ✨ Key Features Explained

### Typewriter Effect
Custom implementation in Hero component that types out your role character by character.

### Animated Avatar
SVG-based character that reacts to mouse hover with animated expressions and movements.

### Circular Skill Progress
Animated SVG circles that fill up to show skill proficiency percentages.

### Scroll Animations
Using Intersection Observer API to detect when sections enter viewport and trigger animations.

### Theme Toggle
Smooth transition between light and dark modes using CSS custom properties.

## 🔒 Security Notes

- Never commit `.env` files to Git
- Use environment variables for sensitive data
- Implement rate limiting on backend API
- Validate and sanitize all user inputs
- Use HTTPS in production
- Implement CORS properly

## 📝 Backend Integration Status

✅ **Frontend:** 100% Complete and Production Ready
📋 **Backend:** Integration points documented in BACKEND_INTEGRATION.md

The frontend works independently with mock data. Follow the backend integration guide to connect to your Express.js API and MongoDB database.

## 🎯 Performance

- **Optimized animations** using Motion (formerly Framer Motion)
- **Lazy loading** for images
- **Code splitting** with React Router
- **CSS Modules** for scoped styles and better performance
- **Smooth 60fps animations**

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 💬 Support

For backend integration help, see [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)

## 🌟 Show Your Support

If you like this portfolio template, give it a !

---

**Built with  using React, Motion, and Custom CSS**

**Backend Ready:** This portfolio is designed to work seamlessly with a MERN stack backend. Follow the integration guide to connect your Express.js API and MongoDB database.
=======
# Portfolio_Priyanshu
Here i am priyanshu kumar a vlsi engineer
>>>>>>> 9945daecbc24d01fe6153deebf5e6dd226941ab3
