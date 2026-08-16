# AB Global Consulting - Private Insurance Agent App

A comprehensive Next.js web application for managing private insurance lead generation, customer intake, and marketing analytics.

## Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database Hosting:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Frontend Hosting:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts

## Local Development

### 1. Prerequisites
- Node.js >= 20
- `pnpm` installed (`npm install -g pnpm`)

### 2. Environment Setup
Copy the `.env.example` file to `.env` (or `.env.local`) and fill in the required variables.

```bash
cp .env.example .env
```

For local development without Supabase, a SQLite database is supported by Prisma natively in this project, but for true parity, you should use a local Postgres or remote dev Supabase instance.

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Database Migrations
Run the Prisma migrations to set up your schema.

```bash
npx prisma generate
npx prisma db push # Or prisma migrate dev
```

### 5. Start Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

The app is broken down into three main sections:
1. **Public Site (`/`):** Dynamic, SEO-friendly landing pages for insurance services.
2. **Client Portal (`/portal`):** Authenticated intake flows for leads to provide consent and book consultations.
3. **Admin Dashboard (`/admin`):** Internal analytics, CRM, and campaign tracking for marketing operations.

## Deployment

Please see [docs/deployment.md](./docs/deployment.md) for full instructions on how to deploy this application to Firebase App Hosting and Supabase.
