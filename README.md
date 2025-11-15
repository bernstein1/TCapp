# TCapp

A modern health benefits platform providing members with unified access to their insurance information, case management, appointments, and support services.

## Features

- **Member Dashboard** - Personalized view of health benefits and account information
- **Interactive Tutorial** - 13-step guided tour showcasing all platform features
- **Financial Calculators** - HSA, FSA, Commuter, and Life Insurance planning tools
- **Case Management** - Track and manage support cases with real-time messaging
- **Document Hub** - Centralized storage for insurance cards, EOBs, and claims with AI assistant
- **Digital Wallet** - 4 premium insurance cards (Medical, Dental, Vision, FSA) with 3D flip animation
- **Appointment Scheduling** - Book and manage consultations with health advocates
- **Services Directory** - Access to partner services and support resources
- **Mobile-First Design** - Responsive navigation drawer with full menu access

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS, Wouter
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **UI Components**: Radix UI, shadcn/ui
- **PDF Generation**: @react-pdf/renderer

## Prerequisites

- Node.js 20.x or higher
- PostgreSQL database (or Neon serverless Postgres)
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bernstein1/TCapp.git
cd TCapp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Edit `.env` and add your database connection string:

```
DATABASE_URL=postgresql://user:password@host:5432/database
PORT=5000
NODE_ENV=development
```

### 4. Initialize the database

Push the schema to your database:

```bash
npm run db:push
```

**Important**: This step is required before running the application. The `db:push` command synchronizes your database schema with the definitions in `shared/schema.ts`. This must also be run after deploying to Vercel with your production database.

### 5. Seed the database (optional)

The application includes seed data for demonstration purposes. The seed will run automatically on first startup if the database is empty.

### 6. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Deployment to Vercel

### Prerequisites

- Vercel account
- PostgreSQL database (recommend Neon for serverless Postgres)

### Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Set up your database**:
   - Create a PostgreSQL database (e.g., on Neon - https://neon.tech)
   - Note your database connection string
   - **Important**: You'll need to run `npm run db:push` locally with your production DATABASE_URL to initialize the schema before deploying

3. **Deploy to Vercel**:

   Via Vercel Dashboard:
   - Push your code to GitHub
   - Import the project in Vercel
   - Add environment variable: `DATABASE_URL`
   - Deploy

   Via CLI:
   ```bash
   vercel
   ```

4. **Configure environment variables in Vercel**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: Set to `production`

5. **Deploy**:
   ```bash
   vercel --prod
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## Project Structure

```
TCapp/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities and helpers
│   │   └── context/     # React contexts (PrintProvider)
│   └── public/          # Static assets
├── server/              # Backend Express application
│   ├── index.ts        # Server entry point
│   ├── routes.ts       # API routes
│   ├── db.ts          # Database configuration
│   └── storage.ts     # Data access layer
├── shared/             # Shared types and schemas
│   └── schema.ts      # Drizzle database schema
└── migrations/        # Database migrations (generated)
```

## Database Schema

The application uses the following main tables:
- `members` - User accounts and insurance information
- `cases` - Support case tracking
- `case_messages` - Case communication
- `documents` - Document storage references
- `appointments` - Scheduled consultations
- `notifications` - User notifications
- `services` - Available support services
- `tasks` - Member tasks and onboarding
- `dependents` - Family member information
- `brand_configs` - White-label configurations

## License

MIT

## Notes

This is a proof-of-concept demonstration showcasing the full functionality of a health benefits platform. It is not intended for production use without proper security hardening, testing, and compliance review.
