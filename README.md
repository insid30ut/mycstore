# Mycelial FunGuy Storefront

Premium specialized e-commerce platform for "Mycelial FunGuy", dedicated to high-quality mycology research materials and genetics.

> [!IMPORTANT]  
> **Work in Progress**: This project is currently in early development. The UI, UX, and overall branding are subject to frequent tweaks, refinements, and alterations as we move towards a production-ready state.

## 📊 Current Build Progress

Phase 1 of the core storefront functionality has been successfully established:

- **Premium Design System**: Glassmorphism aesthetic, dark-mode first UI, and smooth Framer Motion animations.
- **Dynamic Product Engine**: Support for sporeprints, swabs, cultures, and substrate bags with flexible JSONB metadata.
- **Cart & State Management**: Persistent shopping cart using Zustand with real-time total and item tracking.
- **Secure Checkout Flow**: A strictly controlled US-only checkout experience with address validation and order summaries.
- **SEO & Performance**: Optimized for Generative Engine discovery and high-performance Web Vitals.

## 🏗️ Architecture & Tech Stack

- **Frontend**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **State**: Zustand (with Persist middleware)
- **Database**: Supabase (PostgreSQL with RLS and JSONB)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Visit**: Open [http://localhost:3000](http://localhost:3000) to view the storefront in development mode.

## 🔗 Documentation

Detailed progress can be tracked in the following brain artifacts:
- [Work Checklist](file:///C:/Users/kevin/.gemini/antigravity/brain/966a2781-f030-4225-a0c3-409b29847a02/task.md)
- [Project Walkthrough](file:///C:/Users/kevin/.gemini/antigravity/brain/966a2781-f030-4225-a0c3-409b29847a02/walkthrough.md)
- [Implementation Plan](file:///C:/Users/kevin/.gemini/antigravity/brain/966a2781-f030-4225-a0c3-409b29847a02/implementation_plan.md)
