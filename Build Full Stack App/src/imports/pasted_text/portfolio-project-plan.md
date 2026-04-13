You are a full-stack MERN developer tasked with building a complete, production-ready personal portfolio website. Your mission is to create an impressive, animated, and fully functional portfolio that showcases professional work to potential employers.

**Core Requirements:**

Build a complete MERN stack application with the following structure:
- `/client` folder: React.js frontend (single-page application with React Router)
- `/server` folder: Node.js + Express.js REST API
- MongoDB + Mongoose for storing contact form submissions
- Deploy frontend on Vercel/Netlify and backend on Render/Railway

**Do NOT use Tailwind CSS.** Use vanilla CSS with CSS modules or styled-components for styling. All styling must be custom-written or use CSS Grid/Flexbox layouts you create from scratch.

**Design & Layout:**

Create a visually striking portfolio with the following animated sections:

1. **Hero/Landing Section:** Animated intro featuring the user's name, professional role, and designation. Include a typewriter effect or scroll-triggered entrance animation. Add a prominent CTA button to download the CV. Use a professional gradient background or custom design.

2. **Avatar/Character Section:** Display an animated avatar or character illustration (can be custom SVG or image-based) that reacts to user interactions. This avatar should appear on the landing page and be interactive (e.g., changes expression on hover, animates when scrolling, or reacts to navigation).

3. **Navigation:** When users click on "Home" or other nav items, smoothly transition to that section with attractive reveal animations. Each section should fade in, slide up, or use other creative entrance effects.

4. **About Me:** Include a professional bio, profile photo, location, and current status. Animate the section entry on scroll using fade-in or slide-up effects.

5. **Skills Section:** Create an animated, visually creative skills display:
   - Show skill icons/images alongside skill names
   - Display proficiency percentage for each skill
   - Use circular progress charts, animated bars, or custom radial visualizations (not basic bars)
   - Group skills by category: Frontend, Backend, Tools & Technologies
   - Add hover effects, tooltips, and smooth animations as percentages animate in
   - Make this section stand out with creative design

6. **Projects Showcase:** Display minimum 3 projects as interactive cards with:
   - Project name, description, and tech stack badges
   - GitHub repository link and live demo link
   - Optional filter/sort by technology
   - Hover effects and smooth transitions

7. **Education & Experience Timeline:** Create a vertical animated timeline showing:
   - Degrees, institutions, and years of study
   - Internships or work experience (if applicable)
   - Smooth scroll animations as the timeline comes into view

8. **Certifications & Achievements:** Display certificates and achievements with:
   - Certificate images or links to verified certificates
   - Hackathon participations or awards
   - Clean, organized layout with hover effects

9. **CV/Resume Download:** Provide resume download in both PDF and Word (.docx) formats via a backend Express.js route. Files must be served correctly from the server.

10. **Contact Form (Backend Connected):** Build a functional contact form with Name, Email, and Message fields that:
    - Connects to an Express.js backend API route
    - Stores submissions in MongoDB using Mongoose
    - Optional: Send email notification via Nodemailer upon submission
    - Includes form validation and success/error feedback

**Animation & Interactivity Requirements:**

- Use Framer Motion, GSAP, AOS, or CSS animations for smooth, professional animations
- Implement scroll-triggered animations for all major sections
- Add typewriter effect on the hero section
- Animate skill bars/charts as they appear
- Include hover states and transitions throughout
- Make the avatar interactive and reactive
- Ensure all animations are smooth and performant

**Design Standards:**

- **Fully responsive design:** Must work flawlessly on mobile, tablet, and desktop
- **Dark Mode / Light Mode toggle:** Implement a working theme switcher
- **Custom styling:** Use vanilla CSS, CSS modules, or styled-components (NO Tailwind CSS)
- **Creative and modern design:** Make the portfolio visually impressive and unique
- **Consistent color scheme and typography:** Professional, cohesive aesthetic

**Technical Implementation:**

- React.js with React Router for navigation (single-page application)
- Node.js + Express.js backend with proper REST API structure
- MongoDB + Mongoose for data persistence
- Environment variables (.env file) for sensitive data — ensure .env is in .gitignore
- Organized folder structure: `/client` and `/server` directories
- Proper error handling and validation

**File Organization & Deployment:**

- Create organized folder structure with clear separation of concerns
- Include a comprehensive README.md with: project description, live deployment link, and local setup instructions
- Ensure all dependencies are listed in package.json files
- Use .gitignore to exclude node_modules and .env
- Never expose MongoDB URIs, API keys, or passwords in the repository

**Deliverables:**

Generate complete, production-ready code for both frontend and backend in organized files. The code should be:
- Ready to run locally after `npm install` on both client and server
- Fully commented and clean
- Following best practices for file structure and naming
- Including all necessary configuration files

Provide all code organized by folder structure, fully functional and deployable.