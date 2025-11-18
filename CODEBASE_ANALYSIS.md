# TCapp Codebase Comprehensive Analysis

## 1. PROJECT STRUCTURE OVERVIEW

### Directory Layout
```
TCapp/
├── client/                     # React frontend
│   ├── src/
│   │   ├── App.tsx            # Main router and layout
│   │   ├── main.tsx           # Entry point
│   │   ├── index.css          # Global styles & design tokens
│   │   ├── components/        # UI components
│   │   │   ├── ui/            # Radix UI component wrappers (45+ components)
│   │   │   ├── calculators/   # Tax calculator components
│   │   │   ├── education/
│   │   │   ├── examples/
│   │   │   ├── print/
│   │   │   ├── recommendations/
│   │   │   ├── AppointmentCard.tsx
│   │   │   ├── CaseCard.tsx
│   │   │   ├── DocumentCard.tsx
│   │   │   ├── DocumentUploadModal.tsx
│   │   │   ├── DocumentViewerModal.tsx
│   │   │   ├── DocumentChatWidget.tsx
│   │   │   ├── GlassCard.tsx         # Premium glassmorphism component
│   │   │   ├── MemberLayout.tsx      # Main layout wrapper
│   │   │   ├── NewCaseModal.tsx      # Complex multi-step form
│   │   │   ├── OnboardingTutorialOverlay.tsx
│   │   │   ├── TaskBar.tsx
│   │   │   ├── ThemeProvider.tsx     # Dark mode provider
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── WalletCard.tsx
│   │   ├── pages/             # Page components (20 pages)
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CasesPage.tsx
│   │   │   ├── DocumentsPage.tsx
│   │   │   ├── HSACalculator.tsx     # Complex calculator (43KB)
│   │   │   ├── FSACalculator.tsx     # Complex calculator (39KB)
│   │   │   ├── LifeInsuranceCalculator.tsx (25KB)
│   │   │   ├── CommuterCalculator.tsx (14KB)
│   │   │   └── ... other pages
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── use-mobile.tsx       # Media query hook
│   │   │   └── use-toast.ts         # Toast notification hook
│   │   ├── context/           # React context
│   │   │   └── print-context.tsx    # Print functionality
│   │   └── lib/               # Utilities & helpers
│   │       ├── utils.ts             # cn() utility
│   │       ├── queryClient.ts       # React Query setup
│   │       ├── calculations.ts      # Tax calculations
│   │       ├── benefitFacts.ts
│   │       ├── recommendations/
│   │       ├── tax/
│   │       └── pdf/
│   └── public/
│       └── assets/
│           ├── fonts/  (Canela, Avenir fonts)
│           └── logos/
├── server/                    # Express backend
│   ├── index.ts
│   ├── routes.ts
│   ├── db.ts                 # Drizzle ORM setup
│   ├── storage.ts
│   ├── seed.ts
│   └── vite.ts               # SSR Vite config
├── shared/                    # Shared types/utils
├── components.json            # shadcn/ui config
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind CSS config
├── vite.config.ts            # Vite bundler config
├── postcss.config.js         # PostCSS config
└── package.json              # Dependencies

```

### Key Configuration Files
- **tsconfig.json**: Strict mode enabled, path aliases (@/, @shared/), ESNext target
- **vite.config.ts**: React plugin, path aliases, Replit dev plugins (cartographer, dev-banner)
- **tailwind.config.ts**: CSS custom properties, dark mode (class-based), custom animations
- **postcss.config.js**: Tailwind + Autoprefixer
- **components.json**: shadcn/ui config (new-york style, CSS variables)

---

## 2. EXISTING UI COMPONENTS & DESIGN SYSTEM

### Component Library Overview
**45+ UI Components** from Radix UI + shadcn/ui:

#### Core Components (32 UI Components in `/components/ui/`)
- **Layout**: Sidebar (with collapsible state), Sheet (drawer), Dialog, Drawer
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Toggle, Toggle Group, Switch
- **Form Utilities**: Form wrapper (react-hook-form integration), Label, FormField, FormItem
- **Data Display**: Table, Pagination, Badge, Card, Carousel, Chart, Progress
- **Navigation**: Breadcrumb, Command, Context Menu, Dropdown Menu, MenuBar, Navigation Menu
- **Notifications**: Toast, Alert, Tooltip
- **Feedback**: Skeleton (for loading), Popover, Hover Card
- **Accessibility**: All built on Radix UI primitives with ARIA attributes

#### Custom Application Components
- **GlassCard.tsx**: Glassmorphism card with keyboard support (Enter/Space)
- **ThemeProvider.tsx**: Custom dark mode context (light/dark toggle with localStorage)
- **NewCaseModal.tsx**: Complex multi-step form (category → details → review → confirmation)
- **MemberLayout.tsx**: Main layout with sidebar navigation + mobile menu
- **OnboardingTutorialOverlay.tsx**: Step-by-step tutorial guide (16+ steps)
- **DocumentUploadModal.tsx**: File upload with modal
- **DocumentChatWidget.tsx**: AI chat for document questions
- **TaskBar.tsx**: Progress tracking for onboarding tasks
- **CaseCard.tsx**: Message/case card preview
- **AppointmentCard.tsx**: Appointment display
- **DocumentCard.tsx**: Document preview card
- **WalletCard.tsx**: Insurance ID card with flip animation

### Design Tokens (CSS Custom Properties)

#### Color System
**Light Mode** (default):
- Background: `hsl(0 0% 98%)` (light gray)
- Foreground: `hsl(235 18% 15%)` (dark blue-gray)
- Primary: `hsl(185 100% 31%)` (teal/cyan)
- Secondary: `hsl(6 100% 68%)` (coral/orange)
- Accent: `hsl(235 8% 94%)` (light gray)
- Destructive: `hsl(0 72% 45%)` (red)
- Muted: `hsl(235 5% 92%)`

**Dark Mode**:
- Background: `hsl(235 57% 31%)` (deep indigo)
- Foreground: `hsl(0 0% 100%)` (white)
- Primary: `hsl(6 100% 68%)` (coral)
- Secondary: `hsl(185 100% 31%)` (teal)
- Card: `hsl(235 50% 35%)` (slate)

#### Spacing System
- Uses Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24 (8px base)
- `--spacing: 0.25rem` (2px)

#### Border Radius
- lg: `0.5625rem` (9px)
- md: `0.375rem` (6px)
- sm: `0.1875rem` (3px)

#### Typography
- **Sans**: Avenir (custom font)
- **Serif**: Georgia
- **Display**: Canela (custom serif font)
- **Mono**: Menlo

#### Shadow System
- Minimal shadows (`0.00` opacity) - emphasis on elevation system instead

### Elevation System (Hover/Active States)
```css
--elevate-1: rgba(0,0,0, .03)    /* Light mode hover */
--elevate-2: rgba(0,0,0, .08)    /* Light mode active */

--elevate-1: rgba(255,255,255, .04)  /* Dark mode hover */
--elevate-2: rgba(255,255,255, .09)  /* Dark mode active */
```

**CSS Utility Classes**:
- `.hover-elevate`: Adds ::after pseudo-element with hover elevation
- `.active-elevate-2`: Adds active state elevation
- `.toggle-elevate`: Toggleable background elevation
- `.no-default-hover-elevate`: Override class

### Glassmorphism Utilities
```css
.glass-sidebar: backdrop-blur-xl + white/80 (dark: slate-900/80)
.glass-card: backdrop-blur-xl + white/70 (dark: slate-800/70) + border + shadow-lg
.glass-header: backdrop-blur-xl + white/90 (dark: slate-900/90)
.glass-mobile-nav: backdrop-blur-xl + white/95 (dark: slate-900/95)
```

---

## 3. ANIMATION & TRANSITION IMPLEMENTATIONS

### Framer Motion Usage
- **Package**: `framer-motion@11.13.1`
- **Implementation Pattern**: Page-level and component-level animations

#### Page Transition Animations (App.tsx)
```typescript
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};
```
- Used with `AnimatePresence mode="wait"` for smooth page transitions
- Applied to all major routes

#### Component-Level Animations (Dashboard.tsx)
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};
```

### Tailwind CSS Animations
- **Plugin**: `tailwindcss-animate@1.0.7`
- Built-in animations:
  - `animate-pulse`: For skeleton loaders
  - `accordion-down/accordion-up`: For accordion components (200ms ease-out)
  
### Tailwind Data Attributes Animations (UI Components)
Dialog, Select, and other Radix UI components use:
```css
data-[state=open]:animate-in
data-[state=closed]:animate-out
data-[state=closed]:fade-out-0
data-[state=open]:fade-in-0
data-[state=open]:zoom-in-95
data-[state=closed]:zoom-out-95
data-[side=bottom]:slide-in-from-top-2
```

### Animations Applied
- **Page transitions**: Fade + slide (0.5s tween)
- **Modal/Dialog**: Fade + zoom + slide (200ms)
- **Component entry**: Staggered spring animations
- **Card hover**: CSS transitions + elevation system
- **Button states**: `active-elevate-2` class with CSS transitions
- **Task completion**: Implied (mentioned in design guidelines as "confetti animation")

---

## 4. DARK MODE IMPLEMENTATION

### Setup
- **Provider**: Custom `ThemeProvider` context (not next-themes, but similar)
- **Mode**: Class-based (`class` mode in Tailwind config)
- **Storage**: localStorage persistence

### Implementation Details
```typescript
// ThemeProvider.tsx
export function ThemeProvider({ children, defaultTheme = "light" }) {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem("theme") || defaultTheme
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
```

### Dark Mode CSS Variables
- **Dual color system** in `/client/src/index.css`:
  - `:root` (light mode)
  - `.dark` (dark mode)
- **All colors** defined as HSL custom properties with opacity support
- **Automatic scaling**: Dark mode colors are carefully calibrated for contrast
  - Primary: Swaps teal ↔ coral between modes
  - Background/Foreground inverted
  - Accents adjusted for readability

### Usage
- `ThemeToggle.tsx` component for toggle button
- Hook: `useTheme()` from context
- Default theme: "light"

---

## 5. FORM HANDLING PATTERNS

### Form Library
- **Library**: `react-hook-form@7.55.0`
- **Validation**: `zod@3.24.2` + `@hookform/resolvers@3.10.0`
- **Form state management**: useForm hook with watch, control, formState

### Form Component Wrapper (`/components/ui/form.tsx`)
```typescript
// Provides semantic structure for forms
<Form {...methods}>
  <FormField
    control={control}
    name="fieldName"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormDescription>Helper text</FormDescription>
        <FormMessage />  {/* Auto-displays validation errors */}
      </FormItem>
    )}
  />
</Form>
```

### Complex Form Example: NewCaseModal.tsx (79KB)
- **Multi-step form**: category → details → review → confirmation
- **Dynamic fields**: Different form fields based on selected category (7 categories):
  - Provider search
  - Billing inquiry
  - Medication pricing
  - Service approval
  - Benefits help
  - Plan selection
  - Quick question
- **Features**:
  - Pagination between steps
  - Category-specific fields
  - File upload for billing docs
  - Checkboxes, radio groups, selects
  - Rich form validation
  - Confirmation step before submission

### Accessibility in Forms
- **ARIA attributes** automatically applied:
  - `aria-describedby`: Links input to description/error
  - `aria-invalid`: Marks invalid fields
  - `aria-label/aria-hidden`: For screen readers
- **Focus management**: Focus rings on input (2px ring-ring color)
- **Touch targets**: Min-height 9 (36px)

### Input Components
- **Input.tsx**: Basic text input (border, focus ring, disabled states)
- **Select.tsx**: Radix UI Select wrapper with keyboard nav
- **Textarea.tsx**: Multi-line text
- **Checkbox.tsx**: Binary selection
- **Radio Group**: Single selection from multiple
- **Toggle/Toggle Group**: Button-like toggles

---

## 6. TESTING SETUP & COVERAGE

### Current Status
**❌ No test framework configured**
- No `.test.ts`, `.test.tsx`, `.spec.ts` files found
- No Jest, Vitest, or other test runner configuration
- No test setup files

### Implications
- **Coverage**: 0%
- **Automation**: No automated testing
- **CI/CD**: No test gates in pipeline

### Recommendations for Implementation
1. Install test framework (Vitest recommended for Vite projects)
2. Install testing libraries (React Testing Library, Vitest)
3. Add test setup files
4. Create test utilities and mocks
5. Implement integration and unit tests

---

## 7. ANIMATION LIBRARIES & DESIGN TOKENS

### Animation Libraries
1. **Framer Motion** (`framer-motion@11.13.1`)
   - Page transitions
   - Component animations
   - Staggered animations
   - Spring physics animations

2. **Tailwind CSS Animate** (`tailwindcss-animate@1.0.7`)
   - Pulse animations (skeletons)
   - Accordion animations
   - Data attribute-triggered animations
   - Fade, zoom, slide utilities

3. **Custom CSS Animations** (in `tailwind.config.ts`)
   - `accordion-down`: Height 0 → full height (0.2s)
   - `accordion-up`: Full height → 0 (0.2s)

### Animation Tokens (Design System)
```typescript
// From tailwind.config.ts
keyframes: {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
},
animation: {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
}
```

### Performance Optimization Patterns
- **useMemo**: Used in calculators for expensive computations
  - Tax calculations (HSACalculator, FSACalculator, etc.)
  - Recommendations generation
  - Projected expense calculations
- **useCallback**: Used for event handlers to prevent unnecessary re-renders
  - Print handlers
  - Form submission handlers
- **React Query**: Caching and data fetching optimization (`@tanstack/react-query@5.60.5`)

---

## 8. COMPONENT LIBRARY STRUCTURE

### shadcn/ui + Radix UI Integration

#### Configuration (components.json)
```json
{
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "client/src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

#### Radix UI Primitives Used (20+ primitives)
- Accordion, Alert Dialog, Aspect Ratio, Avatar, Checkbox
- Collapsible, Context Menu, Dialog, Dropdown Menu
- Hover Card, Label, Menubar, Navigation Menu
- Popover, Progress, Radio Group, Scroll Area
- Select, Separator, Slider, Switch
- Tabs, Toast, Toggle, Toggle Group
- Tooltip

#### shadcn/ui Patterns
- Wrapper components around Radix primitives
- CSS classes using `clsx` + `tailwind-merge` (cn utility)
- `forwardRef` for component forwarding
- Compound component pattern (e.g., Dialog → DialogHeader, DialogTitle, DialogContent)

#### Custom Application Components
- Wrap shadcn/ui + Radix for domain-specific use cases
- Example: GlassCard wraps keyboard interactions and analytics

---

## 9. TYPESCRIPT CONFIGURATION

### tsconfig.json Settings
```typescript
{
  "include": ["client/src/**/*", "shared/**/*", "server/**/*"],
  "compilerOptions": {
    "strict": true,                    // Strict type checking
    "noEmit": true,                    // Don't emit files
    "module": "ESNext",                // ESNext modules
    "jsx": "preserve",                 // Preserve JSX for Vite
    "esModuleInterop": true,           // CommonJS interop
    "skipLibCheck": true,              // Skip type checking dependencies
    "moduleResolution": "bundler",     // Bundler resolution
    "baseUrl": ".",
    "paths": {
      "@/*": ["./client/src/*"],       // Component alias
      "@shared/*": ["./shared/*"]      // Shared code alias
    }
  }
}
```

### TypeScript Usage
- **Strict mode**: All files type-checked
- **Type safety**: Component props, form data, API responses all typed
- **Zod schemas**: Used for runtime validation + inference

### Example Type Definitions
```typescript
// Custom types throughout
type Theme = "light" | "dark"
type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "destructive"
type CaseCategory = "provider" | "billing" | "medication" | ...
type FormStep = "category" | "details" | "review" | "confirmation"
```

---

## 10. ACCESSIBILITY IMPLEMENTATIONS

### WCAG Compliance Efforts

#### Semantic HTML
- Proper heading hierarchy (h1, h2, h3)
- `<nav>` elements for navigation
- `<main>` for main content
- `<article>` for article content
- `<section>` for logical sections

#### ARIA Attributes
1. **Landmarks**
   - `aria-label`: Custom labels for elements
   - `aria-labelledby`: Link to label elements

2. **Live Regions**
   - `role="alert"`: Alert dialogs, error messages
   - `aria-live="polite"`: Notifications

3. **Form Accessibility**
   - `aria-describedby`: Description + error messages
   - `aria-invalid`: Validation state
   - `htmlFor` on labels → input IDs

4. **Navigation**
   - `aria-label="breadcrumb"`: Breadcrumb nav
   - `aria-current="page"`: Current page indicator
   - `aria-hidden="true"`: Decorative icons/separators

5. **Data Tables & Carousels**
   - `role="region"`, `aria-roledescription="carousel"`
   - `role="group"`, `aria-roledescription="slide"`

#### Keyboard Navigation
- **Sidebar toggle**: Keyboard shortcut `b` (SIDEBAR_KEYBOARD_SHORTCUT)
- **Focus management**: Focus rings on all interactive elements
- **Tab order**: Logical flow through forms and navigation
- **GlassCard**: Supports Enter/Space keys for interactive cards

#### Focus Indicators
- **Color**: `focus-visible:ring-2 focus-visible:ring-ring` (primary color)
- **Offset**: Ring offset for visual separation
- **Applied to**: Buttons, inputs, links, custom interactive elements

#### Touch Targets
- **Minimum size**: 44-48px (design guideline)
- **Spacing**: Adequate gap between interactive elements

#### Color Contrast
- **Design guideline mentions**: "WCAG AA contrast ratios (validated in admin)"
- **Implemented via color system**: Careful selection of foreground/background pairs
- **Light mode**: Dark text on light background
- **Dark mode**: Light text on dark background

#### Semantic Form Structure
```typescript
<FormItem>
  <FormLabel htmlFor={formItemId}>Label</FormLabel>
  <FormControl>
    <Input id={formItemId} aria-describedby={descriptionId} />
  </FormControl>
  <FormDescription id={descriptionId}>Helper text</FormDescription>
  <FormMessage id={messageId}>Error message</FormMessage>
</FormItem>
```

#### Mobile Accessibility
- **Responsive design**: Single column on mobile (< 768px)
- **Touch-friendly**: Large buttons and inputs
- **Mobile menu**: Accessible sheet/drawer navigation
- **Portrait/landscape**: Responsive layout adjustments

#### Semantic Component Usage
- **Buttons**: `<button>` elements with proper types
- **Links**: `<Link>` from wouter for routing
- **Images**: `alt` attributes on all images
- **Icons**: Wrap in `aria-hidden` if decorative, or provide label if meaningful

---

## 11. KEY PERFORMANCE OPTIMIZATIONS

### Code Splitting
- **Vite**: Automatic code splitting for routes
- **React suspense**: Implicit lazy loading

### Memoization
- **useMemo**: Tax calculations, recommendations
- **useCallback**: Event handlers in calculators and forms
- **React.memo**: (Not explicitly used, but pattern supported)

### Image Optimization
- **Custom fonts**: WOFF2 format with swap strategy
- **Logo optimization**: Both light/dark mode logos

### Data Fetching
- **React Query**: Caching, stale-while-revalidate patterns
- **Query deduplication**: Prevent duplicate requests

### Bundle Optimization
- **Tailwind JIT**: CSS only includes used classes
- **Tree shaking**: TypeScript/ESM module support
- **Minification**: Vite handles in production

---

## 12. EXISTING PATTERNS & CONVENTIONS

### Component Patterns
1. **Compound Components**: Dialog, Tabs, Accordion
2. **Controlled Components**: Form inputs with react-hook-form
3. **Higher-Order Components**: ThemeProvider wraps app
4. **Render Props**: Not used (prefer composition)
5. **Custom Hooks**: useIsMobile, useTheme, useToast

### State Management
- **React Context**: Theme, Print context
- **React Hook Form**: Form state
- **React Query**: Server state
- **useState**: Local component state

### Naming Conventions
- **Components**: PascalCase (AppointmentCard, GlassCard)
- **Pages**: PascalCase (Dashboard, DocumentsPage)
- **Utilities**: camelCase (cn, useIsMobile)
- **CSS classes**: kebab-case with elevation/glass prefixes

### Code Organization
- **Components**: Organized by domain (calculators, education, etc.)
- **UI**: Atomic design in `/components/ui/`
- **Pages**: Feature-based in `/pages/`
- **Lib**: Utilities by feature (tax, pdf, recommendations)

---

## 13. CURRENT TECH STACK SUMMARY

### Frontend
- **React 18.3.1**: UI framework
- **TypeScript 5.6.3**: Type safety
- **Tailwind CSS 3.4.17**: Styling
- **Framer Motion 11.13.1**: Animations
- **Radix UI + shadcn/ui**: Component primitives
- **React Hook Form 7.55.0**: Form management
- **Zod 3.24.2**: Runtime validation
- **React Query 5.60.5**: Data fetching
- **Wouter 3.3.5**: Lightweight routing
- **Lucide React 0.453.0**: Icons
- **Recharts 2.15.2**: Charts

### Backend
- **Express.js 4.21.2**: Web framework
- **Drizzle ORM 0.39.1**: Database ORM
- **Passport.js 0.7.0**: Authentication
- **Neon serverless**: Database

### Build/Dev Tools
- **Vite 5.4.20**: Bundler
- **ESBuild 0.25.0**: TypeScript compilation
- **PostCSS 8.4.47**: CSS processing
- **Autoprefixer 10.4.20**: Vendor prefixes

---

## 14. DESIGN GUIDELINES HIGHLIGHTS

### Reference
- Oscar Health, Aetna, Betterment (fintech/health)
- Linear, Notion (productivity tools)

### Color Scheme
- **Primary**: Teal #0095A0
- **Accent**: Coral #FF6B5D
- **Background**: Deep Indigo #22357E (dark theme)

### Animation Principles
- **Minimal, purposeful** animations
- **Page transitions**: 200ms fade
- **Card hover**: 150ms subtle lift
- **Button press**: Scale 0.98
- **No complex scroll animations**

### Touch/Mobile First
- **Minimum touch targets**: 44-48px
- **Mobile layout**: Single column
- **Bottom navigation**: Mobile primary nav
- **Sidebar**: Desktop persistent nav

### Whitespace & Spacing
- Generous margins (p-6 = 24px padding standard)
- Clear visual hierarchy
- Ample vertical rhythm

---

## 15. GAPS & AREAS FOR IMPROVEMENT

### Testing
❌ No automated test framework
❌ No unit/integration tests
❌ No test coverage

### Performance Monitoring
❌ No analytics/telemetry setup (except data-testid/data-analytics-id attributes)
❌ No error tracking
❌ No performance monitoring

### Documentation
❌ No Storybook or component documentation
❌ No API documentation
❌ Limited inline code comments

### Accessibility
⚠ Some components may need review for full WCAG AA compliance
⚠ No prefers-reduced-motion support mentioned
⚠ No high contrast mode support

### Mobile Optimization
⚠ Some complex forms may need mobile-specific UX improvements
⚠ Could benefit from bottom sheet components for mobile forms

### Error Handling
⚠ Limited error boundary implementation
⚠ No retry logic visible in React Query setup

### Build Optimization
⚠ Could benefit from bundle analysis
⚠ Could optimize image loading strategy

---

## 16. DEPENDENCIES TO WATCH

### Animation-related
- `framer-motion@11.13.1`
- `tailwindcss-animate@1.0.7`
- `tw-animate-css@1.2.5` (appears to be duplicate/alternate)

### UI Components
- All @radix-ui packages (20+ primitives)

### Forms & Validation
- `react-hook-form@7.55.0`
- `zod@3.24.2`
- `@hookform/resolvers@3.10.0`

### Utilities
- `class-variance-authority@0.7.1` (Component variant styling)
- `clsx@2.1.1` (Conditional classnames)
- `tailwind-merge@2.6.0` (Tailwind class merging)

### Optional/Polyfills
- `bufferutil@4.0.8` (WebSocket optimization)

