# StudySphere - Your Sphere of Study
---

**StudySphere** is a premier **AI-powered educational platform** designed to transform passive video watching into an interactive learning experience. By leveraging advanced AI, StudySphere converts YouTube videos into comprehensive study guides, complete with transcripts, summaries, and interactive quizzes.

It brings together **video learning**, **AI analysis**, **progress tracking**, and **distraction-free viewing** in a clean, modern interface.

- **Tech Stack:** React, Tailwind CSS, Node.js, Express, MongoDB, Google Gemini AI, Docker

---

## 🎯 Problem Statement

In the age of endless content, **retention** is the real challenge. Students and professionals watch hours of tutorials but often struggle to recall key concepts or test their understanding.

**StudySphere solves this by:**

1.  **Removing Distractions**: No sidebar recommendations or ads.
2.  **Active Recall**: AI-generated quizzes force you to test your knowledge immediately.
3.  **Quick Review**: Summaries and transcripts allow for rapid revision without re-watching.

If you support this mission, leaving a ⭐ helps others discover the project!

---

## 🚀 Key Features

| Feature                 | Description                                |
| ----------------------- | ------------------------------------------ |
| **AI Transcripts**      | Accurate, time-synced video transcripts    |
| **Smart Summaries**     | AI-generated concise summaries of content  |
| **Interactive Quizzes** | Auto-generated quizzes to test retention   |
| **Distraction Free**    | Clean player interface focused on learning |
| **Progress Tracking**   | Track watched videos and quiz scores       |
| **Playlist Support**    | Import entire YouTube playlists            |
| **Secure Auth**         | Google OAuth & Local Authentication        |
| **Responsive Design**   | Works seamlessly on desktop and mobile     |

---

## 🧪 Tech & Architecture

This project is built as a **Monorepo** containing both the Frontend and Backend.

### **Frontend**

- **Framework:** React
- **Styling:** Tailwind CSS, Framer Motion
- **Icons:** Lucide React
- **State/Routing:** React Router, Context API
- **SEO:** React Helmet Async

### **Backend**

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **AI Engine:** Google Gemini API
- **Authentication:** Passport.js (Google OAuth)
- **Video Processing:** youtube-transcript, ytdl-core
