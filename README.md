<div align="center">
  <img src="./client/public/images/school-crest-transparent.png" alt="School Logo" width="120" />
  <h1>🎓 St. Joseph English High School & Vidya Mandir Portal</h1>
  <p><strong>A Next-Generation School Management & Cinematic Gallery Platform</strong></p>

  <p>
    <img src="https://img.shields.io/badge/JavaScript-74.9%25-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript 74.9%" />
    <img src="https://img.shields.io/badge/CSS-24.2%25-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS 24.2%" />
    <img src="https://img.shields.io/badge/Other-0.9%25-gray?style=for-the-badge" alt="Other 0.9%" />
  </p>
</div>

---

## 📖 About The Project

This is a complete, modern web portal designed for **St. Joseph English High School / Vidya Mandir**. It provides an ultra-premium public-facing website, a cinematic event archive, and a secure, role-based internal portal for Students, Teachers, and Admins.

Built with performance, security, and aesthetics in mind, this project uses a React frontend with rich Framer Motion animations and an OWASP-secured Node/Express backend.

---

## ✨ Features

- **🎬 Cinematic Memory Archive:** A stunning 3D-stacked, auto-cycling gallery for school events, categorized by academic year with admin "cover change" capabilities.
- **🔐 Role-Based Access Control:** Distinct dashboards and toolsets for `Student`, `Teacher`, `Parent`, and `Admin` roles.
- **🛡️ Enterprise Security:** OWASP Top 10 aligned backend utilizing `helmet`, `xss-clean`, rate limiting, and MongoDB sanitization.
- **📱 Responsive Editorial UI:** A sleek, dark-mode optimized interface built with Tailwind CSS, Phosphor Icons, and Radix/Shadcn primitives.

---

## 🗺️ Page Walkthrough

*(Note: Replace the placeholder image paths below with actual screenshots of the platform!)*

### 1. Home / Landing Page
The entry point featuring a dramatic cinematic intro, interactive hero section, and quick links to admissions and academics.
> *[Add Screenshot Here]*
> `![Home Page](./screenshots/home.png)`

### 2. The Archive (Gallery)
A 3D deck-style, auto-sliding gallery grouped by academic year. Admins can update cover photos seamlessly.
> *[Add Screenshot Here]*
> `![Gallery](./screenshots/gallery.png)`

### 3. Album View (Photos)
Clicking into an event opens a beautiful masonry grid of high-res photos with a fully keyboard-navigable Lightbox.
> *[Add Screenshot Here]*
> `![Album View](./screenshots/album.png)`

### 4. Auth & Login Portal
Secure login gateway with distinct visual cues for different user roles.
> *[Add Screenshot Here]*
> `![Login](./screenshots/login.png)`

### 5. Role Dashboard
The authenticated user interface. Layouts adapt dynamically based on whether the user is a student, teacher, or administrator.
> *[Add Screenshot Here]*
> `![Dashboard](./screenshots/dashboard.png)`

---

## 🛠️ Technology Stack

**Frontend:**
- React 18 (Vite)
- Tailwind CSS
- Framer Motion
- Phosphor Icons

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shashankinfernape/Joseph.git
   ```

2. **Install Client Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Server Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Run the Application Locally**
   From the client folder:
   ```bash
   npm run dev
   ```

---

<div align="center">
  <p>Built with ❤️ for St. Joseph English High School.</p>
</div>
