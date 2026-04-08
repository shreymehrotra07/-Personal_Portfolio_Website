# Personal_Portfolio_Website

A modern, animated personal portfolio built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

- Glassmorphism dark UI with smooth Framer Motion animations
- Fully responsive — works on mobile, tablet, and desktop
- Dynamic project showcase with category filtering and detail pages
- Contact form powered by EmailJS (no backend required)
- Resume download & preview
- Skills, Experience & Education sections

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Routing | React Router v6 |
| Contact Form | EmailJS |
| Icons | React Icons |

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/shreymehrotra07/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> Get these from [EmailJS Dashboard](https://dashboard.emailjs.com)

### 4. Run locally

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

## 🌐 Deployment (Vercel)

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Add the three `VITE_EMAILJS_*` environment variables in the Vercel dashboard
4. Click **Deploy** — done!

The `vercel.json` file handles SPA routing automatically.

## 📁 Project Structure

```
client/
├── public/
│   ├── favicon.svg
│   └── resume.pdf          ← Replace with your actual resume
├── src/
│   ├── assets/
│   │   └── Image.jpg       ← Your profile photo
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Projects.jsx
│   │   ├── Resume.jsx
│   │   ├── Sidebar.jsx
│   │   └── SkillsPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── vercel.json
└── tailwind.config.js
```

## 🔒 Security Note

Your EmailJS keys are loaded from environment variables (`VITE_EMAILJS_*`).  
**Never commit your `.env` file.** It is listed in `.gitignore` by default.

## 📄 License

MIT © Shrey Mehrotra
