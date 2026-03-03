# 🤖 Agent Intelligence & Architecture Guide

This document is for future LLMs/Agents interacting with this repository. 

## System Architecture
This is a **Next.js 14+ (App Router)** project configured for **Static Export** (`output: "export"`). It uses a custom-built Markdown engine to decouple content from code.

### 1. The Content Engine (`src/lib/markdown.ts`)
- **Source of Truth:** All editable content resides in the `/content` root directory.
- **Parsing:** Uses `gray-matter` for frontmatter and `remark` for HTML conversion.
- **Data Flow:** `src/app/page.tsx` and `src/app/research/page.tsx` are Server Components that fetch data from `/content` at build time.

### 2. Styling System
- **Framework:** **Tailwind CSS v4**.
- **Configuration:** Most theme variables are defined in `src/app/globals.css` using the `@theme` block. 
- **Conventions:** Follows an "Academic Professional" aesthetic—minimalist, high whitespace, and high-contrast typography.

### 3. Deployment
- **Platform:** GitHub Pages.
- **CI/CD:** Managed via `.github/workflows/deploy.yml`.

## Interaction Guidelines
- **NEVER** hardcode bio, news, or research data into `.tsx` files. Always abstract to a `.md` file in `/content`.
- **Styling:** When adjusting UI, prefer updating variables in `globals.css` before adding utility classes to maintain the global "Academic" theme.
- **Dependencies:** This environment is sensitive to home-directory write permissions. Always use a custom npm cache if running `npm install` in a restricted sandbox.