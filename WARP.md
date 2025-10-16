# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A Next.js 15 wedding invitation website with React 19, featuring real-time wishes submission via Firebase, animated UI with Framer Motion, and a sophisticated theme system.

## Development Commands

### Core Commands
```bash
# Development server with Turbopack
bun dev
# or: npm run dev / yarn dev / pnpm dev

# Production build
bun run build

# Start production server
bun run start

# Lint code
bun run lint
```

### Port
- Development server runs on `http://localhost:3000`

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives
- **Package Manager**: Bun (lockfile present)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/wishes/        # API route for wishes CRUD
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Main wedding invitation page
│   └── globals.css        # Global styles and Tailwind config
├── components/
│   ├── ui/                # Reusable shadcn/ui components
│   └── wedding/           # Wedding-specific components
│       ├── CoverPage.tsx          # Initial landing cover
│       ├── HeroSection.tsx        # Hero with couple names
│       ├── EventDetails.tsx       # Wedding event info
│       ├── CountdownTimer.tsx     # Live countdown
│       ├── LocationMap.tsx        # Venue location
│       ├── PhotoMosaic.tsx        # Photo galleries (desktop sidebars)
│       ├── WishesSection.tsx      # Container for wishes
│       ├── WishForm.tsx           # Form to submit wishes
│       ├── WishesDisplay.tsx      # Display submitted wishes
│       └── MusicPlayer.tsx        # Background audio player
└── lib/
    ├── firebase.ts            # Firebase initialization
    ├── firebase-service.ts    # Firestore service class
    ├── theme.ts               # Centralized design system
    ├── types.ts               # TypeScript type definitions
    └── utils.ts               # Utility functions (cn, etc.)
```

## Architecture Patterns

### Design System (src/lib/theme.ts)
- Centralized theme with navy, gold, and cream color palette
- Pre-defined gradients, shadows, typography, and animations
- Helper functions: `getColorClass()`, `getGradientClass()`, `getInlineGradient()`
- Semantic color utilities for consistent usage
- All components should reference `theme` object for styling consistency

### Firebase Integration
- Service class pattern (`FirebaseService`) with static methods
- Operations: `getWishes()`, `addWish()`
- API routes (`/api/wishes`) handle client-server communication
- Firestore collection: `wishes` (fields: name, message, createdAt)
- Data flows: Client → API Route → FirebaseService → Firestore

### Component Architecture
- Page-level state management in `src/app/page.tsx`
- Framer Motion for all animations and scroll effects
- Wedding components are modular and self-contained
- shadcn/ui components in `src/components/ui/` for base UI elements

### Configuration
- Environment variables for Firebase credentials (`.env`)
- Wedding details (date, names) configurable via `.env`:
  - `NEXT_PUBLIC_WEDDING_DATE`
  - `NEXT_PUBLIC_GROOM_NAME`
  - `NEXT_PUBLIC_BRIDE_NAME`
- Path aliases: `@/*` maps to `./src/*`

## Key Implementation Details

### Animation Strategy
- Parallax scroll effects via `useScroll()` and `useTransform()`
- Sequential reveal with `whileInView` animations
- Staggered delays for continuous flow feeling
- Motion values for background parallax and opacity changes

### API Routes
- `GET /api/wishes`: Fetch all wishes (cached for 60s)
- `POST /api/wishes`: Submit new wish (validated with required fields)
- Edge runtime disabled (using Node.js runtime)

### Styling Approach
- Tailwind CSS with custom theme configuration
- shadcn/ui components configured with "new-york" style
- Custom gradients and color system in `theme.ts`
- Responsive design with mobile-first approach
- Desktop: Photo mosaics as sidebars
- Mobile: Photo grid within main content flow

### State Management
- Component-level state with React hooks
- Configuration loaded client-side from environment variables
- Scroll-based UI state (e.g., scroll-to-top button visibility)

## Firebase Setup

Collection: `wishes`
- `id`: Auto-generated document ID
- `name`: string
- `message`: string  
- `createdAt`: Firestore Timestamp

Ensure Firebase config in `.env` matches your project.

## Important Notes

- Uses Bun as package manager (check `bun.lock`)
- Next.js 15 with experimental Turbopack support
- React 19 features enabled
- TypeScript strict mode enabled
- ESLint configured to ignore `@typescript-eslint/no-explicit-any`
- Remote images from `firebasestorage.googleapis.com` whitelisted in Next.js config

## Making Changes

### Adding New Wedding Components
1. Create component in `src/components/wedding/`
2. Import and use theme from `@/lib/theme`
3. Wrap with Framer Motion for animations
4. Add to main page sequence in `src/app/page.tsx`

### Modifying Theme
1. Update color values in `src/lib/theme.ts`
2. Maintain consistency across gradients and color scales
3. Update semantic color utilities if adding new colors

### Database Changes
1. Modify types in `src/lib/types.ts`
2. Update `FirebaseService` methods in `src/lib/firebase-service.ts`
3. Adjust API route handlers in `src/app/api/wishes/route.ts`
4. Update Firestore schema/security rules in Firebase Console
