# TCapp - Prioritized Action Items

**Generated:** 2025-11-18
**Source:** Comprehensive Codebase Audit
**Related:** See CODEBASE_AUDIT_REPORT.md for full details

---

## 🚨 CRITICAL - Must Fix Before Production

### 1. Connect Frontend to Backend API
**Priority:** P0 - BLOCKER
**Effort:** 3-5 days
**Owner:** Frontend Lead

**Current State:** All frontend pages use hardcoded mock data
**Target State:** Frontend consumes REST API endpoints

**Tasks:**
- [ ] Create API hooks in `client/src/hooks/api/`
  - [ ] `useAuth()` - Authentication
  - [ ] `useCases()` - Case management
  - [ ] `useDocuments()` - Document retrieval
  - [ ] `useAppointments()` - Scheduling
  - [ ] `useTasks()` - Onboarding tasks
  - [ ] `useNotifications()` - Alerts
  - [ ] `useProfile()` - User profile
- [ ] Replace mock data in all pages:
  - [ ] Dashboard.tsx
  - [ ] CasesPage.tsx
  - [ ] CaseDetailPage.tsx
  - [ ] DocumentsPage.tsx
  - [ ] SchedulePage.tsx
  - [ ] SettingsPage.tsx
- [ ] Add loading states (use Skeleton components)
- [ ] Add error handling UI
- [ ] Update React Query config (remove `staleTime: Infinity`)
- [ ] Test complete data flow: DB → API → Frontend

**Files:**
- `client/src/pages/*.tsx` (all pages)
- `client/src/hooks/api/*.ts` (new)
- `client/src/lib/queryClient.ts` (update)

---

### 2. Implement Real Authentication
**Priority:** P0 - BLOCKER
**Effort:** 5-7 days
**Owner:** Backend Lead + Frontend Lead

**Current State:** Hardcoded MOCK_MEMBER_ID, no password verification
**Target State:** Secure Passport.js authentication with sessions

**Backend Tasks:**
- [ ] Add `password` field to `members` table
  ```typescript
  password: text("password").notNull()
  ```
- [ ] Install bcrypt: `npm install bcrypt @types/bcrypt`
- [ ] Create password hashing utilities
- [ ] Implement Passport Local Strategy
  - [ ] Create `server/auth/passport.ts`
  - [ ] Configure Passport serialization
- [ ] Configure express-session
  - [ ] Add session secret to .env
  - [ ] Set up session store (connect-pg-simple)
- [ ] Update auth routes:
  - [ ] POST `/api/auth/login` - Verify credentials
  - [ ] POST `/api/auth/logout` - Destroy session
  - [ ] POST `/api/auth/signup` - Create account
  - [ ] GET `/api/auth/user` - Get current user
- [ ] Add auth middleware to protected routes
- [ ] Remove MOCK_MEMBER_ID

**Frontend Tasks:**
- [ ] Create `AuthContext` provider
- [ ] Create `useAuth()` hook
- [ ] Implement login page functionality
- [ ] Implement signup page functionality
- [ ] Implement logout
- [ ] Add route guards (redirect to /login if not authenticated)
- [ ] Handle 401 responses globally
- [ ] Show user info in MemberLayout (replace hardcoded)

**Environment Variables:**
- [ ] Add `SESSION_SECRET` to .env.example
- [ ] Document session configuration

**Testing:**
- [ ] Test login flow
- [ ] Test signup flow
- [ ] Test logout
- [ ] Test protected route access
- [ ] Test session persistence

**Files:**
- `server/auth/passport.ts` (new)
- `server/routes.ts` (update auth routes)
- `server/index.ts` (add session middleware)
- `shared/schema.ts` (add password field)
- `client/src/context/auth-context.tsx` (new)
- `client/src/hooks/use-auth.ts` (new)
- `client/src/pages/LoginPage.tsx` (connect to API)

---

### 3. Fix Security Vulnerabilities
**Priority:** P0 - BLOCKER
**Effort:** 2-3 days
**Owner:** DevOps + Backend Lead

**Tasks:**

#### A. Dependency Vulnerabilities
- [ ] Run `npm audit fix --force`
- [ ] Test application after fixes
- [ ] Update specific packages:
  - [ ] glob: `npm install glob@latest`
  - [ ] vite: `npm install vite@latest`
  - [ ] express-session: `npm install express-session@latest`
- [ ] Re-run `npm audit` and verify 0 vulnerabilities
- [ ] Update package-lock.json
- [ ] Document any breaking changes

#### B. Add Security Middleware
- [ ] Install helmet: `npm install helmet`
- [ ] Configure helmet in server/index.ts
  ```typescript
  import helmet from 'helmet';
  app.use(helmet({
    contentSecurityPolicy: { ... },
    hsts: { maxAge: 31536000 }
  }));
  ```
- [ ] Install csurf: `npm install csurf`
- [ ] Add CSRF protection to state-changing routes
- [ ] Install express-rate-limit: `npm install express-rate-limit`
- [ ] Add rate limiting:
  ```typescript
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use('/api/', limiter);
  ```

#### C. Fix Database Null Handling
- [ ] Update `server/db.ts`:
  ```typescript
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }
  export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  ```
- [ ] Add environment validation on startup
- [ ] Update error messages

#### D. Add Security Headers
- [ ] Update `vercel.json` headers:
  ```json
  {
    "key": "X-XSS-Protection",
    "value": "1; mode=block"
  },
  {
    "key": "Strict-Transport-Security",
    "value": "max-age=31536000; includeSubDomains"
  },
  {
    "key": "Content-Security-Policy",
    "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  }
  ```

**Files:**
- `package.json` (update dependencies)
- `server/index.ts` (add middleware)
- `server/db.ts` (fix null handling)
- `vercel.json` (add headers)

---

### 4. Add Test Infrastructure
**Priority:** P0 - BLOCKER
**Effort:** 5-7 days
**Owner:** QA Lead + All Developers

**Tasks:**

#### A. Set Up Testing Framework
- [ ] Install Vitest: `npm install -D vitest @vitest/ui`
- [ ] Install React Testing Library:
  ```bash
  npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
  ```
- [ ] Create `vitest.config.ts`
- [ ] Add test scripts to package.json:
  ```json
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest --coverage"
  ```

#### B. Write Critical Path Tests
- [ ] API Route Tests (`server/__tests__/routes.test.ts`):
  - [ ] Authentication routes
  - [ ] Cases CRUD operations
  - [ ] Authorization checks
  - [ ] Input validation
- [ ] Database Tests (`server/__tests__/storage.test.ts`):
  - [ ] Member operations
  - [ ] Case operations
  - [ ] Foreign key constraints
- [ ] Component Tests:
  - [ ] Login form validation
  - [ ] Case creation modal
  - [ ] Dashboard data display
  - [ ] Error handling

#### C. E2E Tests
- [ ] Install Playwright: `npm install -D @playwright/test`
- [ ] Create `e2e/` directory
- [ ] Write critical flows:
  - [ ] Login → Dashboard
  - [ ] Create case → View case
  - [ ] Upload document

#### D. Coverage Goals
- [ ] Set minimum coverage: 70%
- [ ] Add coverage to CI/CD
- [ ] Generate coverage reports

**Files:**
- `vitest.config.ts` (new)
- `server/__tests__/` (new directory)
- `client/src/__tests__/` (new directory)
- `e2e/` (new directory)
- `package.json` (add test scripts)

**Target:** 50+ tests, 70%+ coverage

---

## 🔴 HIGH PRIORITY - Production Hardening

### 5. Add Code Quality Tools
**Priority:** P1 - HIGH
**Effort:** 1-2 days
**Owner:** Tech Lead

**Tasks:**

#### A. ESLint
- [ ] Install ESLint:
  ```bash
  npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
  npm install -D eslint-plugin-react eslint-plugin-react-hooks
  ```
- [ ] Create `.eslintrc.json`:
  ```json
  {
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ],
    "rules": {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "error"
    }
  }
  ```
- [ ] Add lint script: `"lint": "eslint . --ext .ts,.tsx"`
- [ ] Fix existing lint errors

#### B. Prettier
- [ ] Install Prettier:
  ```bash
  npm install -D prettier eslint-config-prettier
  ```
- [ ] Create `.prettierrc.json`:
  ```json
  {
    "semi": true,
    "singleQuote": false,
    "tabWidth": 2,
    "printWidth": 100
  }
  ```
- [ ] Add format script: `"format": "prettier --write ."`
- [ ] Format all files

#### C. Husky + lint-staged
- [ ] Install husky:
  ```bash
  npm install -D husky lint-staged
  npx husky install
  ```
- [ ] Add pre-commit hook:
  ```bash
  npx husky add .husky/pre-commit "npx lint-staged"
  ```
- [ ] Configure lint-staged in package.json:
  ```json
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
  ```

#### D. GitHub Actions CI/CD
- [ ] Create `.github/workflows/ci.yml`:
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
        - run: npm ci
        - run: npm run lint
        - run: npm run check
        - run: npm run test
        - run: npm run build
  ```
- [ ] Test CI pipeline
- [ ] Add status badges to README

**Files:**
- `.eslintrc.json` (new)
- `.prettierrc.json` (new)
- `.github/workflows/ci.yml` (new)
- `package.json` (add scripts)

---

### 6. Database Optimization
**Priority:** P1 - HIGH
**Effort:** 2-3 days
**Owner:** Database Lead

**Tasks:**

#### A. Add Indexes
- [ ] Update `shared/schema.ts`:
  ```typescript
  export const members = pgTable("members", {
    // ... fields
  }, (table) => ({
    emailIdx: index("email_idx").on(table.email),
    memberIdIdx: index("member_id_idx").on(table.memberId),
  }));

  export const cases = pgTable("cases", {
    // ... fields
  }, (table) => ({
    memberIdIdx: index("cases_member_id_idx").on(table.memberId),
    statusIdx: index("cases_status_idx").on(table.status),
  }));
  ```
- [ ] Add indexes to all foreign key columns
- [ ] Run `npm run db:push`
- [ ] Verify index creation

#### B. Fix Date Fields
- [ ] Migrate text dates to timestamp:
  ```typescript
  // Before
  dateOfBirth: text("date_of_birth")

  // After
  dateOfBirth: timestamp("date_of_birth")
  ```
- [ ] Create migration script
- [ ] Test date queries

#### C. Connection Pooling
- [ ] Configure pool in `server/db.ts`:
  ```typescript
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20, // max connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  ```

#### D. Migration Strategy
- [ ] Remove `migrations/` from .gitignore
- [ ] Document migration workflow in README
- [ ] Create migration rollback strategy

**Files:**
- `shared/schema.ts` (add indexes)
- `server/db.ts` (configure pooling)
- `docs/migrations.md` (new)

---

### 7. Error Handling & Logging
**Priority:** P1 - HIGH
**Effort:** 3-4 days
**Owner:** Backend Lead + Frontend Lead

**Tasks:**

#### A. Structured Logging (Backend)
- [ ] Install winston: `npm install winston`
- [ ] Create `server/logger.ts`:
  ```typescript
  import winston from 'winston';

  export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
  });
  ```
- [ ] Replace all `console.log` with `logger.info()`
- [ ] Add request ID tracking
- [ ] Log all API errors

#### B. Fix Error Handler
- [ ] Update `server/index.ts` error handler:
  ```typescript
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('Unhandled error', { error: err, requestId: req.id });
    const status = err.status || err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message;
    res.status(status).json({ message });
    // DO NOT throw err here!
  });
  ```

#### C. Error Boundaries (Frontend)
- [ ] Create `client/src/components/ErrorBoundary.tsx`
- [ ] Wrap routes in ErrorBoundary
- [ ] Add error reporting (Sentry integration optional)

#### D. API Error Handling
- [ ] Standardize error responses:
  ```typescript
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid input",
      "details": [...]
    }
  }
  ```
- [ ] Add error toast notifications in frontend

**Files:**
- `server/logger.ts` (new)
- `server/index.ts` (fix error handler)
- `client/src/components/ErrorBoundary.tsx` (new)

---

### 8. Documentation
**Priority:** P1 - HIGH
**Effort:** 2-3 days
**Owner:** Tech Lead

**Tasks:**

#### A. API Documentation
- [ ] Install swagger: `npm install swagger-jsdoc swagger-ui-express`
- [ ] Add JSDoc comments to routes
- [ ] Generate OpenAPI spec
- [ ] Serve at `/api/docs`

#### B. Architecture Documentation
- [ ] Create `docs/architecture.md`
- [ ] Add system architecture diagram
- [ ] Document data flow
- [ ] Explain authentication flow

#### C. Contributing Guide
- [ ] Create `CONTRIBUTING.md`
- [ ] Document development workflow
- [ ] Code style guidelines
- [ ] PR process

#### D. Deployment Runbook
- [ ] Create `docs/deployment.md`
- [ ] Document environment variables
- [ ] Database setup steps
- [ ] Rollback procedures
- [ ] Monitoring and alerts

#### E. Update README
- [ ] Add "Current State" section
- [ ] Document that app was in prototype state
- [ ] Update feature list (mark completed vs. planned)
- [ ] Add troubleshooting section

**Files:**
- `docs/architecture.md` (new)
- `docs/deployment.md` (new)
- `CONTRIBUTING.md` (new)
- `README.md` (update)

---

## 🟡 MEDIUM PRIORITY - Optimization

### 9. Performance Optimization
**Priority:** P2 - MEDIUM
**Effort:** 3-5 days
**Owner:** Performance Engineer

**Tasks:**

#### A. Bundle Analysis
- [ ] Install analyzer: `npm install -D rollup-plugin-visualizer`
- [ ] Add to vite.config.ts
- [ ] Analyze bundle size
- [ ] Identify large dependencies

#### B. Code Splitting
- [ ] Split large components:
  - [ ] NewCaseModal.tsx (79KB)
  - [ ] Calculator pages
- [ ] Use React.lazy() for routes
- [ ] Add loading fallbacks

#### C. Caching Strategy
- [ ] Install Redis: `npm install redis`
- [ ] Cache API responses
- [ ] Set appropriate cache TTLs
- [ ] Implement cache invalidation

#### D. Database Query Optimization
- [ ] Analyze slow queries
- [ ] Add query result caching
- [ ] Optimize N+1 queries

#### E. CDN Setup
- [ ] Move static assets to CDN
- [ ] Optimize images (WebP)
- [ ] Add font optimization

**Files:**
- `vite.config.ts` (add analyzer)
- `client/src/App.tsx` (add lazy loading)
- `server/cache.ts` (new)

---

### 10. Dependency Updates
**Priority:** P2 - MEDIUM
**Effort:** 3-5 days
**Owner:** Tech Lead

**Tasks:**

#### A. React 19 Upgrade (Research Required)
- [ ] Read React 19 migration guide
- [ ] Test in separate branch
- [ ] Update react and react-dom
- [ ] Fix breaking changes
- [ ] Test thoroughly

#### B. Express 5 Upgrade (Research Required)
- [ ] Read Express 5 migration guide
- [ ] Test in separate branch
- [ ] Update express
- [ ] Fix breaking changes
- [ ] Test all API routes

#### C. Zod 4 Upgrade
- [ ] Update zod to v4
- [ ] Test all schemas
- [ ] Update drizzle-zod
- [ ] Verify validation still works

#### D. Other Dependencies
- [ ] Update drizzle-orm to latest
- [ ] Update framer-motion
- [ ] Update other minor dependencies
- [ ] Test after each update

**Files:**
- `package.json` (update dependencies)
- Various files (fix breaking changes)

---

## 📋 Additional Improvements

### Low Priority (P3)
- [ ] Add user analytics (PostHog, Mixpanel)
- [ ] Add performance monitoring (Sentry, LogRocket)
- [ ] Implement feature flags (LaunchDarkly)
- [ ] Add A/B testing framework
- [ ] Optimize PDF generation
- [ ] Add PWA support
- [ ] Implement dark mode improvements
- [ ] Add accessibility audit (axe-core)
- [ ] Add storybook for component library
- [ ] Implement design system documentation

---

## Completion Checklist

### Phase 1: Critical Fixes (Week 1-3)
- [ ] Frontend connected to backend
- [ ] Authentication implemented
- [ ] Security vulnerabilities fixed
- [ ] Basic test suite added
- [ ] **MILESTONE: Application functional and secure**

### Phase 2: Production Hardening (Week 4-6)
- [ ] Code quality tools configured
- [ ] Database optimized
- [ ] Error handling implemented
- [ ] Documentation complete
- [ ] **MILESTONE: Production ready**

### Phase 3: Optimization (Week 7+)
- [ ] Performance optimizations applied
- [ ] Dependencies updated
- [ ] Monitoring implemented
- [ ] **MILESTONE: Production optimized**

---

## Success Metrics

**Before Production Launch:**
- ✅ All P0 (CRITICAL) items complete
- ✅ All P1 (HIGH) items complete
- ✅ Test coverage ≥ 70%
- ✅ 0 security vulnerabilities
- ✅ Load time < 2s
- ✅ API response time < 200ms
- ✅ Uptime ≥ 99.9%

**Ongoing:**
- Monitor error rates
- Track performance metrics
- Review security scans monthly
- Update dependencies quarterly

---

**Last Updated:** 2025-11-18
**Next Review:** After Phase 1 completion
