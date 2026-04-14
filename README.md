<div align="center">

<img src="https://img.shields.io/badge/ripple-v1.0.0-6366f1?style=for-the-badge&logoColor=white" alt="version"/>

# 🌊 Ripple

### *Your voice. Amplified.*

**Ripple** is a modern AI-powered Text-to-Speech platform that transforms written words into rich, natural-sounding audio — with seamless voice management, billing, and a beautifully crafted dashboard.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)](https://clerk.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![tRPC](https://img.shields.io/badge/API-tRPC-398CCB?style=flat-square&logo=trpc&logoColor=white)](https://trpc.io/)
[![Polar](https://img.shields.io/badge/Billing-Polar-1a1a1a?style=flat-square)](https://polar.sh/)

<br/>

[🚀 Get Started](#-getting-started) · [✨ Features](#-features) · [🛠 Tech Stack](#-tech-stack) · [📁 Project Structure](#-project-structure)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎙️ **Text to Speech** | Convert any text into natural, high-quality audio instantly |
| 🎵 **Audio Player** | Built-in audio player with waveform visualization and playback controls |
| 🗣️ **Voice Selection** | Choose from a wide library of AI voices — different tones, accents & styles |
| 🎛️ **Voice Management** | Create, customize, and manage your personal voice collection |
| 🕘 **TTS History** | Full history of all your generated audio with replay and download |
| 💳 **Billing & Plans** | Seamless subscription management powered by Polar |
| 🔐 **Auth & Orgs** | Secure authentication + organization support via Clerk |
| 📊 **Dashboard** | Beautiful overview of usage stats, recent activity, and quick actions |

---

## 🛠 Tech Stack

```
Frontend       →  Next.js 15 (App Router) + TypeScript + Tailwind CSS
API Layer      →  tRPC (end-to-end type-safe APIs)
Auth           →  Clerk (users + organizations)
Database       →  Prisma ORM + PostgreSQL
TTS Engine     →  music-metadata + custom Python TTS pipeline
Billing        →  Polar.sh
UI Components  →  shadcn/ui
```

---

## 📁 Project Structure

```
ripple/
├── 📂 src/
│   ├── app/               # Next.js App Router pages & layouts
│   ├── components/        # Reusable UI components
│   ├── server/            # tRPC routers & backend logic
│   │   └── trpc/          # tRPC context, procedures & middleware
│   ├── lib/               # Utilities (db, polar, helpers)
│   └── hooks/             # Custom React hooks
├── 📂 prisma/             # DB schema & migrations
├── 📂 public/             # Static assets
├── 📂 scripts/            # Utility & seed scripts
└── chatterbox_tts.py      # Python TTS processing script
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- PostgreSQL database
- Clerk account → [clerk.com](https://clerk.com)
- Polar account → [polar.sh](https://polar.sh)

### 1. Clone the repository

```bash
git clone https://github.com/hardik-kumar-10/ripple.git
cd ripple
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Polar Billing
POLAR_ACCESS_TOKEN=...
POLAR_WEBHOOK_SECRET=...
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 🔐 Auth & Authorization

Ripple uses **Clerk** for authentication with two levels of access:

- `authProcedure` — requires a signed-in user
- `orgProcedure` — requires a signed-in user **and** an active organization

---

## 💳 Billing

Subscription management is handled by **[Polar.sh](https://polar.sh)** — usage-based or flat billing plans with webhooks for real-time subscription updates.

---

## 🐍 TTS Pipeline

The core Text-to-Speech generation uses a custom **Python script** (`chatterbox_tts.py`) alongside the Node.js backend, enabling high-quality voice synthesis with support for multiple voices and audio formats.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "feat: add amazing feature"

# Push and open a PR
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

Made with ❤️ by [Hardik Kumar](https://github.com/hardik-kumar-10)

⭐ If you found this useful, consider giving it a star!

</div>
