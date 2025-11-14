# TouchCare Platform Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern health/fintech platforms (Oscar Health, Aetna, Betterment) combined with productivity tools (Linear, Notion) for clean, professional interfaces optimized for daily use.

## Core Brand Design System

### Color Palette
**Primary Brand (Default TouchCare Theme)**
- Background: Deep Indigo `#22357E` (90% coverage)
- Text: White `#FFFFFF`
- Accent: Coral `#FF6B5D` (sparingly on key nouns/adjectives and CTAs)
- Secondary Highlight: Teal `#0095A0` (secondary emphasis, status indicators)

**Semantic Colors**
- Success: Emerald green `#10B981`
- Warning: Amber `#F59E0B`
- Error: Red `#EF4444`
- Info: Sky blue `#3B82F6`

**TouchCare Blue Premium Tier**
- Primary: Deep Navy `#1E3A5F`
- Accent: Champagne Gold `#D4AF37`
- Darker, richer backgrounds with subtle gradients

**Admin Portal**
- Lighter neutral backgrounds `#F9FAFB`, `#F3F4F6`
- Sidebar: `#1F2937`
- Text: Dark gray `#111827`
- Accents: Professional blue `#3B82F6`

### Typography
**Fonts**
- Headline: Montserrat (bold 700, geometric sans-serif)
- Body/UI: Inter (regular 400, medium 500, semi-bold 600)

**Scale**
- Hero Headlines: 48px (desktop), 32px (mobile)
- Section Headers: 32px (desktop), 24px (mobile)
- Card Titles: 20px
- Body: 16px
- Small/Meta: 14px
- Captions: 12px

**Emphasis**: Single noun or adjective in coral color OR italic (never both)

### Layout System
**Spacing Primitives**: Use Tailwind units of `2`, `4`, `6`, `8`, `12`, `16`, `20`, `24` (e.g., p-4, m-8, gap-6)

**Breakpoints**
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns where appropriate)
- Desktop: > 1024px (multi-column, persistent sidebars)

**Container Widths**
- Max content width: `1280px`
- Form containers: `640px`
- Card grids: 2-3 columns on desktop, 1 on mobile

## Component Library

### Navigation
**Member Portal - Mobile**
- Bottom navigation bar (fixed)
- 5 primary items: Dashboard, Cases, Documents, Wallet, Settings
- Icons with labels, active state with coral underline

**Member Portal - Desktop**
- Left sidebar (persistent, 240px width)
- Logo at top
- Primary nav items with icons
- User profile/settings at bottom
- TouchCare Blue badge next to username for premium members

**Admin Portal**
- Top app bar with logo, breadcrumbs, admin name
- Left sidebar navigation organized by sections
- Collapsible sections for deep hierarchies

### Cards & Containers
**Standard Card**
- White background (or `#2A3F8F` on indigo backgrounds)
- Rounded corners: `12px`
- Subtle shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Padding: `p-6` (24px)
- Hover: subtle lift with increased shadow

**Task Bar (Member Dashboard)**
- Prominent position at top of dashboard
- Soft teal background `#0095A0` with 10% opacity
- Progress ring or linear indicator
- Expandable/collapsible
- Individual task items with checkboxes
- Completion celebration: confetti animation + success message

**Message/Case Cards**
- Avatar (40px circle) on left
- Name, timestamp, preview text
- Unread indicator: coral dot
- Status badge (Open/Resolved) with color coding
- Swipe actions on mobile

### Forms & Inputs
**Input Fields**
- Large touch targets (minimum 48px height)
- White background with subtle border
- Focus state: coral border glow
- Placeholder text: light gray
- Labels above fields, 14px medium weight
- Inline validation with icons and helper text
- Auto-advance for verification codes

**Buttons**
- Primary: Coral `#FF6B5D`, white text, bold
- Secondary: White outline on indigo, white text
- Ghost: Text only with underline on hover
- Height: 48px (mobile), 44px (desktop)
- Rounded: `8px`
- Active/hover: slightly darker shade, no complex interactions

### Modal & Overlays
**Modals**
- Centered on screen, max-width `600px`
- Dark overlay backdrop (60% opacity)
- Slide-up animation on mobile, fade-in on desktop
- Header with title and close button
- Footer with actions (right-aligned)

**Bottom Sheets (Mobile)**
- Slide up from bottom
- Drag handle for dismissal
- Used for quick actions, filters, confirmations

### Data Display
**Tables (Admin)**
- Clean grid layout
- Alternating row backgrounds
- Sortable column headers
- Row hover states
- Pagination at bottom
- Responsive: card stack on mobile

**Lists**
- Clean separation with subtle borders
- Avatar/icon on left
- Primary text, secondary metadata
- Action buttons/links on right
- Pull-to-refresh on mobile

### Notifications & Alerts
**Toast Messages**
- Top-right corner (desktop), top-center (mobile)
- Auto-dismiss after 5 seconds
- Icon + message + optional action
- Color-coded by type

**In-App Notification Badge**
- Coral circle with white number
- Positioned top-right of icon/avatar
- Pulsing animation for new items

### Wallet/ID Cards
**Card Design**
- Realistic card dimensions (3.375:2.125 ratio)
- Front: Member info, logo, QR code
- Back: Contact info, instructions
- Flip animation (3D effect)
- Subtle shadow and rounded corners
- Brightness boost when wallet opened

### Scheduling Components
**Calendar Integration**
- Embedded iframe styled to match brand
- Appointment cards with clear datetime, provider, join buttons
- Countdown timers for upcoming appointments
- Action buttons: Reschedule, Cancel, Add to Calendar

## Page-Specific Layouts

### Onboarding Flow
- Full-screen single-column mobile layout
- Progress indicator at top (steps 1/5)
- Large friendly headline with key term in coral
- Ample whitespace around inputs
- Auto-focus on first field
- Next/Continue button prominent at bottom
- Skip option for deferred fields

### Dashboard (Home)
**Mobile**: Single column vertical scroll
1. Task Bar (expandable)
2. Active Cases (3 preview cards)
3. Notifications (collapsed, latest 3)
4. Upcoming Appointments (next 2)
5. Quick Actions FAB (bottom-right)

**Desktop**: 2-3 column grid
- Left: Task Bar + Cases
- Center: Notifications + Appointments
- Right: Quick Actions sidebar

### Case Thread View
- Full-screen on mobile
- Header: subject, status, agent info
- Chronological message bubbles
- Member messages: right-aligned, coral background
- Agent messages: left-aligned, light gray background
- Composer at bottom with attachment button
- Real-time indicators (typing, delivered, read)

### Document Hub
- Grid of document cards (2-3 columns desktop, 1 mobile)
- Tabs for categories (Insurance, Claims, EOBs, etc.)
- Search bar at top
- Filter chips below search
- Card shows: icon, name, date, preview thumbnail
- Quick actions: View, Download, Share

### Settings
**Desktop**: Left sidebar navigation + right content pane
**Mobile**: Accordion sections or full-screen drill-down

Each section header with icon, clear separation between sections

## White-Label Theming Strategy

**Implementation**: CSS custom properties for all brand tokens
```
--brand-primary
--brand-secondary
--brand-text
--brand-accent
```

**Admin Configuration**:
- Logo uploader with live preview
- Color picker with WCAG contrast validation
- Font selector (Google Fonts)
- Preview toggle (mobile/tablet/desktop)

**Hierarchy**: Base TouchCare → Client Override → Premium Blue Overlay

## Animations & Interactions
- Minimal, purposeful animations
- Page transitions: fade (200ms)
- Card hover: subtle lift (150ms)
- Button press: scale 0.98
- Task completion: checkmark animation + confetti
- No complex scroll animations or parallax

## Accessibility
- WCAG AA contrast ratios (validated in admin)
- Keyboard navigation throughout
- Focus indicators (coral outline)
- Screen reader labels
- Semantic HTML
- Touch targets minimum 44x44px
- Reduced motion support

## Images
**Member Portal Hero Sections**: Use aspirational health/wellness imagery
- Onboarding welcome: Diverse individuals smiling, warm lighting
- Empty states: Friendly illustrations (not photos)

**Admin Portal**: Professional icons and diagrams only, no decorative images