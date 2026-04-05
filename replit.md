# CannaZen — CBD Premium

## Overview
CannaZen is a CBD e-commerce website built with Vite + React 19 + TypeScript + Tailwind CSS v4. Warm botanical theme matching original design from git commit 6d000f1. Uses sage green (#6b8f5e) as primary button color, moss green (#3d5a3a) for banner/footer, cream (#f7f3ec) background, Cormorant Garamond display font + Inter body font. Internal product catalog (28 products), Supabase auth with PostgreSQL profiles, cart with localStorage persistence, Smokellier keyword chatbot, and sandbox checkout.

## Architecture
- **Dev Server**: Vite on port 5000 (host 0.0.0.0, allowedHosts: true)
- **Frontend**: React 19 SPA with react-router-dom v7
- **Styling**: Tailwind CSS v4 via @tailwindcss/vite plugin
- **Icons**: lucide-react
- **Fonts**: Cormorant Garamond (display headings, italic), Inter (body text) — both via Google Fonts
- **Auth**: Supabase Auth (Google sign-in, Email/Password, Password Reset) + PostgreSQL user profiles
- **Validation**: Zod schemas for forms (login, register, reset password, profile, address)
- **E-commerce**: Internal product catalog (no Ecwid), cart in localStorage, sandbox checkout
- **SEO**: react-helmet-async with per-page <Helmet> (title, meta description, og tags)
- **Notifications**: react-hot-toast for cart add/remove feedback + auth toasts
- **Performance**: React.lazy() + Suspense for all route components, lazy-loaded images below fold
- **Accessibility**: aria-labels on all icon-only buttons, focus-visible outlines, proper alt text
- **SEO files**: public/robots.txt, public/sitemap.xml

## Design System (EXACT original from git 6d000f1)
- Background: #f7f3ec (cream)
- Cards: white/80 with backdrop-blur, border-[#e8efe4]/50
- Primary sage: #6b8f5e (buttons, accents, links)
- Sage dark: #4a6741 (hover states)
- Sage light: #e8efe4 (light backgrounds)
- Moss: #3d5a3a (promo banner, footer, age gate backdrop)
- Warm gray: #7a7267 (secondary text)
- Earth: #8b7355
- Gold: #c4a35a (Smokellier accents)
- Gold light: #f5ecd7
- Foreground: #2c2520 (primary text)
- Display font: Cormorant Garamond (italic, semibold, serif)
- Body font: Inter (400, 500, 600, 700)
- Logo: Inline SVG component (src/components/ui/Logo.tsx) + PNG logo at public/logo-cannazen.png (golden leaf, used on Home hero)

## Key Files
- **src/lib/supabase.ts**: Supabase client SDK init (graceful: works without config)
- **src/lib/supabaseAuth.ts**: Auth helpers (signInWithGoogle, signInWithEmail, registerWithEmail, resetPassword, supabaseSignOut)
- **src/lib/supabaseDb.ts**: Supabase DB CRUD (UserProfile, wishlist, addresses, cart sync)
- **src/lib/validators/auth.ts**: Zod schemas (loginSchema, registerSchema, resetPasswordSchema, updateProfileSchema, addressSchema)
- **src/lib/AuthContext.tsx**: Auth provider with Supabase onAuthStateChange + PostgreSQL profile loading
- **src/hooks/useAuthActions.ts**: Hook with auth actions + toast feedback
- **src/lib/constants.ts**: Site name, routes, storage keys, shipping config
- **src/components/ui/LoadingSpinner.tsx**: Suspense fallback for lazy routes
- **src/components/ui/ScrollToTopButton.tsx**: Scroll-to-top button (appears after 300px scroll)

## Auth Components
- **src/components/auth/LoginModal.tsx**: Login modal (Google + Email, Zod validation, cream theme)
- **src/components/auth/RegisterModal.tsx**: Register modal (password strength indicator, age+terms checkboxes, cream theme)
- **src/components/auth/ResetPasswordModal.tsx**: Password reset modal (email form, success state)
- **src/components/auth/UserMenu.tsx**: User dropdown (avatar, account links, loyalty points, sign out)
- **src/components/auth/AuthGuard.tsx**: Protected route wrapper (redirects to /connexion)
- **src/components/auth/SocialButton.tsx**: Google sign-in button component

## Pages & Routes
- `/` — Home (hero "L'univers de Mary Jane", categories, best-sellers, nouveautés, newsletter)
- `/boutique` — Shop (28 products, category filter, search with URL params)
- `/boutique/:slug` — Product detail (effects, intensity, Smokellier quote, wishlist heart, add to cart)
- `/connexion` — Login/Register/Reset (modal-based, redirects when authenticated)
- `/compte` — Account (AuthGuard, profile card with stats, menu links)
- `/compte/commandes` — Orders history (AuthGuard, localStorage)
- `/wishlist` — Wishlist (AuthGuard, Firestore-backed product favorites)
- `/checkout` — Checkout (3 shipping + 3 payment options)
- `/checkout/confirmation/:id` — Order confirmation
- `/a-propos` — About
- `/cgv` — CGV
- `/mentions-legales` — Legal
- `/politique-de-confidentialite` — Privacy
- `*` — 404 NotFound page

## Key Components
- **Logo** (src/components/ui/Logo.tsx): Inline SVG with two leaf paths (#4A6741 + #6B8F5E) and "CannaZen" text in Cormorant Garamond
- **Header**: Centered Logo, promo banner (moss #3d5a3a), dropdown nav by molecule, search, UserMenu (when logged in) or User icon (when not), cart icon with sage counter badge
- **Footer**: Moss green (#3d5a3a), 5 columns (logo, nav, categories, legal, contact), payment badges
- **AgeGate**: "Bienvenue au jardin" + "l'univers de Mary Jane" text, 18+ verification, localStorage (cannazen-age-verified)
- **CartDrawer**: Slide-in from right, quantity controls, free shipping threshold with conditional messaging
- **ChatWidget (Smokellier)**: "Le Smokellier" header, sage green (#6b8f5e) theme, keyword responses, product suggestions
- **ProductCard**: Image (lazy-loaded, 300x300), badge, Cormorant Garamond name, rating stars, price

## Product Categories (28 total)
- Gummies D9 (Cookies®): 2 products
- Fleurs CBD: 5 products
- Fleurs D10: 6 products
- Résines D10: 2 products
- Fleurs OH+: 5 products
- Vapes (OH+ & HEC10): 6 products
- Huiles CBD: 2 products

## Auth System
- Supabase client SDK (graceful: isSupabaseConfigured checks for VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)
- When NOT configured: shows error toast on auth action, app works normally without auth
- When configured: Google sign-in OAuth redirect, Email/Password with Zod validation, password reset email
- PostgreSQL profiles table with: wishlist, addresses, preferences, stats (orders/spent/loyalty)
- Auth modals (Login/Register/Reset) styled in cream/botanical theme
- UserMenu dropdown in Header when authenticated
- AuthGuard wrapper for protected routes (/compte, /compte/commandes, /wishlist)
- Supabase env vars needed: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
- SQL migration file: supabase-migration.sql (run in Supabase SQL Editor)

## Data Storage
- Cart: localStorage key 'cannazen-cart'
- Orders: localStorage key 'cannazen-orders'
- Age gate: localStorage key 'cannazen-age-verified'
- User profiles: Firestore 'users' collection (when Firebase configured)
- Wishlist: Firestore arrayUnion/arrayRemove on user profile
- Cart sync: Firestore 'carts' collection (for logged-in users, when Firebase configured)

## Checkout
- Shipping: Colissimo (4.90€, free >49€), Chronopost Express (9.90€), Point Relais (3.90€, free >39€)
- Payment: Card (PayGreen/OVRI sandbox), Virement (IBAN LU61 6060 0020 0000 5401), Klarna 3x (coming soon)
- Sandbox mode with yellow MODE TEST banner

## Legal Info
- CannaZen — Benkiran Hatim
- 11 rue de Tourraine, 67100 Strasbourg
- contact@cannazen.space

## Build
- `npx vite build` — Zero TypeScript errors, zero build errors
