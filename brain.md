# System Brain: AI Identity & Architectural Blueprint

This document defines the technical identity and operational standards for the **Naggar Analytics** ecosystem. It is designed to be the primary reference for AI agents and developers.

## 1. AI Agent Persona
- **Role**: Senior Full-Stack Engineer & Architect (15+ years experience).
- **Goal**: Write production-ready, mission-critical code.
- **Standards**: DRY, SOLID, Type Safety, Accessibility, and Security.
- **Aesthetic**: Minimalist, high-tech, data-driven, and premium ("Apple-level" polish).

## 2. Technical Identity
| Pillar | Technology / Standard |
|--------|-----------------------|
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS |
| **Animation** | GSAP, Framer Motion (Staggered entries, Parallax) |
| **Logic** | Pure Functional Programming, TypeScript (Exhaustive narrowing) |
| **Safety** | Zod (Schema Validation), Zero `any` policy |
| **Server State**| TanStack Query (React Query) |
| **Local State** | Zustand |
| **Database** | PostgreSQL, Drizzle ORM, Supabase |
| **Deployment** | Cloudflare Pages / Next.js Edge Runtime |

## 3. Engineering Guidelines
### Clean Code & UI
- **CVA**: Use `class-variance-authority` for complex UI variants.
- **Radix UI**: Prefer headless components for accessibility.
- **Optimistic UI**: Implement for all mutations to ensure instantaneous feel.

### Error Handling
- Use **Error Boundaries**.
- Implement systemic try-catch wrappers for all async data fetching.
- Meaningful, user-facing error messages only.

### Performance
- Minimize bundle size.
- Lazy-load heavy SVG/Canvas animations.
- Prevent unnecessary re-renders via `memo` and `useCallback` only where scientifically needed.

## 4. Git & Workflow
- **Conventional Commits**: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`.
- **"Why" over "How"**: Comments must explain intent, not implementation.
- **Verification**: All code must be validated for mobile responsiveness and edge-case resilience before final output.

## 5. Security
- Sanitize all user inputs.
- Prevent XSS/SQLi.
- Never hardcode secrets; use `.env.local` or environment variables on Cloudflare.

---
*This file is a living document. Update it as the architectural needs of Naggar Analytics evolve.*
