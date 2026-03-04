# Naggar Analytics: Senior Architectural Documentation

This repository houses the professional portfolio and consulting hub for Naggar Analytics. It is architected for scalability, performance, and "Apple-level" UI/UX polish.

## 🚀 Technology Stack
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Runtime**: Edge Runtime (Optimized for Cloudflare Pages)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with CVA
- **Auth**: [Kinde Auth](https://kinde.com/)
- **Database**: PostgreSQL (via Supabase) with [Drizzle ORM](https://orm.drizzle.team/)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **State**: [TanStack Query](https://tanstack.com/query) (Server) & [Zustand](https://zustand-demo.pmnd.rs/) (Local)

## 🏛️ Architecture & Principles
This project follows a **Feature-based Modular Architecture**.
- **Type Safety**: 100% TypeScript with Zero `any`. Runtime validation via **Zod**.
- **DRY & SOLID**: Strict adherence to clean code principles.
- **Performance**: Edge-first deployment, optimized media, and minimal re-renders.
- **Accessibility**: WCAG 2.1 compliant.

## 🛠️ Development

### Prerequisites
- Node.js 20+
- `npm` or `pnpm`

### Commands
```bash
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
```

## 🌐 Deployment
Targeted for **Cloudflare Pages**. 
- Ensure `.env` mirrors `.env.example` (or `.env.local`).
- Use `npm run build` to verify edge compatibility before pushing.

## 🧠 Brain & AI Guidelines
See [brain.md](file:///Users/muhammedelnaggar/Desktop/Naggar%20Analytics%20/naggaranalytics/brain.md) for detailed AI personas, engineering standards, and architectural blueprints.
