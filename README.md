# Preparatory Alumni Association (PAA) Website

The official website for the **Preparatory Alumni Association**, connecting the global community of alumni from Mohammadpur Preparatory School & College.

## 🌟 Overview

This project is a modern, responsive web application built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**. It serves as the digital hub for PAA, featuring information about the association's mission, focus areas, patrons, and providing a secure contact channel for alumni.

## 🚀 Key Features

*   **Modern UI/UX**: Clean, professional design with a light theme and glassmorphism effects.
*   **Dynamic Animations**: Smooth scroll-triggered animations and interactive elements powered by Framer Motion.
*   **Secure Contact Form**: 
    *   Integrated with **Nodemailer** for reliable SMTP email delivery.
    *   Protected by **Google reCAPTCHA v2** to prevent spam submissions.
*   **SEO Optimized**: 
    *   Comprehensive metadata, Open Graph tags, and Twitter Cards.
    *   Auto-generated `sitemap.xml` and `robots.txt` for search engine visibility.
*   **Performance**: Built on Next.js App Router with Turbopack for fast builds and optimal runtime performance.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: TypeScript
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Email Service**: Nodemailer (SMTP)
*   **Spam Protection**: Google reCAPTCHA v2

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

*   Node.js 18+ installed.
*   npm or yarn package manager.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/areez/preparatory-alumni-nxtjs.git
    cd preparatory-alumni-nxtjs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your configuration keys:

    ```env
    # SMTP Configuration (for Contact Form)
    SMTP_HOST=smtp.example.com
    SMTP_PORT=587
    SMTP_SECURE=false
    SMTP_USER=your_email@example.com
    SMTP_PASS=your_password
    SMTP_FROM_EMAIL=your_email@example.com

    # Google reCAPTCHA v2 Credentials
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
    RECAPTCHA_SECRET_KEY=your_secret_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## 📂 Project Structure

```
├── app/                # Next.js App Router
│   ├── api/contact/    # Server-side contact form handler
│   ├── layout.tsx      # Root layout with SEO metadata
│   ├── page.tsx        # Main landing page components
│   ├── sitemap.ts      # Dynamic sitemap generation
│   ├── robots.ts       # Robots.txt configuration
│   └── manifest.ts     # PWA Manifest
├── public/             # Static assets (images, icons)
├── components/         # Reusable UI components
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is proprietary to the **Preparatory Alumni Association**. All rights reserved.

---

Designed & Developed for **PAA**.
