# Momenial Brand Book

## 1. BRAND OVERVIEW

**1.1 Brand Story & Mission**  
Momenial, founded as PT Momenial Open Media in Bekasi, Indonesia, empowers users to create, customize, and share verifiable digital certificates effortlessly via a mobile-first platform. It originated to simplify credentialing for education, events, and businesses, addressing the need for authentic, shareable proofs of achievement.  
**Mission**: To make verifiable credentials accessible, customizable, and shareable for everyone, turning accomplishments into memorable digital assets.  
**Vision**: A world where every certification is instantly verifiable and seamlessly integrated into personal and professional digital lives.

**1.2 Core Values**  
- **Simplicity**: Streamline certificate creation to be as easy as 1-2-3, minimizing complexity for users.  
- **Verifiability**: Ensure every certificate includes unique links and wallet integration for trusted authenticity.  
- **Flexibility**: Offer customization, multi-device access, and integration options to fit diverse workflows.  
- **Affordability**: Provide a generous free tier and transparent pricing without hidden gimmicks.  
- **Trust**: Build reliability through partnerships with global teams and secure, shareable formats.

**1.3 Brand Positioning**  
- **Target Audience**: Educators, event organizers, HR professionals, and businesses in education, training, and product certification sectors; tech-savvy users aged 25-50 seeking mobile/desktop tools.  
- **Unique Value Proposition**: Effortless creation of verifiable, customizable certificates with built-in sharing (QR, social, wallets) at competitive prices, outperforming rigid alternatives like Accredible.  
- **Brand Personality Traits**: Approachable, innovative, reliable, empowering, fun (e.g., playful headlines like "Sharing Is Caring").

## 2. VISUAL IDENTITY

**2.1 Logo Usage**  
- **Primary Logo**: SVG format (logo-blue-no-bg.svg); vector-based, scalable; blue (#0D7B5E equivalent) text "Momenial" with icon; width auto, height 40px on nav, 32px on footer.  
- **Logo Variations**: Full color (blue on white bg); monochrome (grayscale for docs); reversed (white on primary bg, logo-white-no-bg.svg); favicon (16x16px icon-only from SVG crop).  
- **Minimum Size**: Desktop: 32px height; mobile: 28px height.  
- **Clear Space**: 1x logo height around all sides; no alterations or stretching.  
- **Placement**: Top-left nav header; left-aligned footer; centered favicons; avoid on busy images.  
- **Incorrect Usage**: No color inversion on light bgs; no text reflow; avoid <24px sizes or pixelation.

**2.2 Color System**  
- **Primary Colors**: hsl(152, 69%, 31%) (success/green, #0D7B5E) for CTAs/buttons; hsl(0, 0%, 100%) (white) for bgs.  
- **Secondary/Accent Colors**: hsl(207, 65%, 38%) (blue, #1A73E8) for text/links; hsl(0, 0%, 97%) (#F5F5F5) for subtle accents.  
- **Semantic Colors**: Success: hsl(152, 69%, 31%); Warning: hsl(40, 100%, 55%) (#FFC107, inferred from badges); Error: hsl(0, 100%, 40%) (#DC3545); Info: hsl(207, 65%, 38%).  
- **Neutral/Grayscale Palette**: hsl(0, 0%, 20%) (#333) dark text; hsl(0, 0%, 60%) (#999) muted; hsl(0, 0%, 100%) bg; light mode only (data-bs-theme="light").  
- **Background Colors**: Primary: hsl(0, 0%, 100%); Footer: hsl(152, 69%, 31%).  
- **Usage Hierarchy**: 60% neutrals, 30% primary green, 10% accent blue; green for actions, blue for info.  
- **Accessibility**: All contrasts meet WCAG AA (4.5:1 min); e.g., green text on white: 6.1:1; test with tools like WAVE.

**2.3 Typography**  
- **Primary Typeface**: Lato (Google Fonts CDN: font-family: 'Lato', sans-serif; weights: 400, 700).  
- **Secondary Typeface**: Sans-serif fallback for UI (e.g., buttons, labels).  
- **Font Hierarchy (CSS)**:  
  - H1: 48px, weight 700, line-height 1.2, letter-spacing -0.02em;  
  - H2: 36px, weight 700, line-height 1.3, letter-spacing 0;  
  - H3-H6: Scale down 20-30% (e.g., H3: 28px);  
  - Body: 16px, weight 400, line-height 1.6, letter-spacing 0;  
  - Small/Caption: 14px, weight 400, line-height 1.4.  
- **Responsive Type Scale**: Desktop (>1024px): Base 16px; Tablet (768-1024px): 15px base, fluid scaling; Mobile (<768px): 14px base, clamp() for headings (e.g., clamp(32px, 5vw, 48px)).  
- **Web Font Loading**: Preload Lato via <link rel="preload">; fallback: system sans-serif; optimize with font-display: swap.

**2.4 Iconography**  
- **Icon Style**: Outline (Bootstrap Icons, line-based, currentColor fill).  
- **Icon Sizes**: 16px (small UI), 24px (nav/actions), 32px (hero/emphasized).  
- **Icon Library**: Bootstrap Icons (bi- prefix, e.g., bi-whatsapp, bi-translate); custom SVGs for why/use-cases (e.g., why/1.svg).  
- **Usage Guidelines**: Navigation (hamburger, language); actions (WhatsApp, download); status (badges); align baseline, 0.125rem spacing; no color fills unless semantic (e.g., green for success).

**2.5 Imagery & Media**  
- **Photography Style**: Clean, modern screenshots of app/UI; vibrant, professional (e.g., certificate previews); rounded corners (Bootstrap rounded class, ~0.375rem inferred).  
- **Image Aspect Ratios**: Hero: 16:9 (wide); Features: 1:1 squares; Cards: 4:3.  
- **Image Standards**: WebP preferred (hero.webp), fallback JPG/PNG; compress <200KB; lazy-load with loading="lazy".  
- **Video Guidelines**: None prominent; if used, 16:9, no autoplay, MP4/WebM <10s for demos.  
- **Placeholder/Loading**: Skeleton loaders (gray placeholders); alt text mandatory (e.g., "Get it on Google Play").

**2.6 Spacing & Grid System**  
- **Base Spacing Unit**: 4px (JSON), scaled via Bootstrap (e.g., py-3 = 1rem ~16px multiples).  
- **Spacing Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px (e.g., mb-3=16px, py-5=48px).  
- **Grid Structure**: Bootstrap 12-column; container max-width 1140px (lg); gutters 1.5rem.  
- **Responsive Breakpoints**: Mobile: <768px (stacked, full-width); Tablet: 768-1024px (2-col); Desktop: >1024px (fluid, 12-col).

## 3. UI COMPONENTS

**3.1 Navigation Components**  
- **Header/Navbar**: Sticky-top, bg-body (white), expand-md; logo left, nav-items center (Home, Features, Pricing, Blog), WhatsApp btn right (green), language dropdown (bi-translate icon). Mobile: Collapsible #menu, toggler icon.  
- **Navigation Menu Styles**: Primary: Active underline (nav-link active); Secondary: Footer links (link-light).  
- **Breadcrumbs**: Not used; infer simple text if added.  
- **Footer Navigation**: 4 cols (Company, Help, Legal, Comparisons); uppercase headings, list-unstyled links; social icons (bi-facebook etc., white).

**3.2 Buttons & CTAs**  
- **Primary**: btn-success (hsl(152,69%,31%) bg, white text); e.g., "WhatsApp Us" with icon.  
- **Secondary**: btn-outline (border, transparent bg); Tertiary: Link-styled (nav-link).  
- **States**: Default: Solid; Hover: Darken 10% (Bootstrap); Active: Scale 0.98; Disabled: Opacity 0.65; Loading: Spinner via data-bs-toggle.  
- **Sizes**: Default (1rem padding); lg for CTAs (btn-lg).  
- **Icon Buttons**: Inline SVGs (e.g., whatsapp icon, mb-1); Groups: d-grid for stacking.  
- **Link Styles**: Blue underline on hover (hsl(207,65%,38%)); States match buttons.  
- **Borders/Radius**: 0.375rem (Bootstrap rounded); JSON 0px suggests minimal, but use rounded for images/cards.

**3.3 Form Elements**  
- Inferred from platform: Text inputs (border, focus blue ring); Textareas (multi-line, resize vertical).  
- Selects: Bootstrap dropdowns (e.g., language).  
- Checkboxes/Radios: Standard Bootstrap (customizable).  
- Toggles: None shown; use switches if added.  
- Validation: Error (red border/text), Success (green); Warnings (yellow).  
- Labels/Placeholders: Lato 14px, gray (#999); Helper: Small muted text.  
- File Upload: Drag-drop inferred, with preview thumbnails.

**3.4 Feedback Components**  
- **Alerts/Notifications**: Bootstrap alerts (e.g., bg-danger for badges); Types: success (green), error (red), warning (yellow), info (blue).  
- **Toasts/Snackbars**: Position top-right, auto-dismiss 5s.  
- **Modals**: Standard Bootstrap (e.g., for consultations).  
- **Loading**: Spinners (bi-spinner); Progress bars for uploads; Skeletons for images.  
- **Tooltips/Popovers**: Via data-bs-toggle; e.g., on icons.  
- **Empty States**: Muted text + icon (e.g., "No certificates yet").

**3.5 Content Components**  
- **Cards**: Rounded p-4 (e.g., use-cases); Body with img, h4 title, p text.  
- **Tables**: Bootstrap table (striped, hover); Sorting: Arrow icons; Pagination: Bottom nav.  
- **Lists**: Unstyled/ul (features); Ordered for steps; Badges (bg-danger "NEW").  
- **Badges/Tags**: Rounded, colored bgs (e.g., position-absolute).  
- **Avatars**: Circular imgs (inferred for recipients).  
- **Accordions**: Bootstrap (e.g., features); Rounded items, show first.  
- **Tabs**: None shown; use nav-tabs if added.

## 4. INTERACTION & BEHAVIOR

**4.1 Interactive States**  
- **Hover**: Bg lighten/darken 10%, cursor pointer; e.g., btn hover scale 1.02.  
- **Focus**: Blue outline (hsl(207,65%,38%), 0.25 opacity) for accessibility; Keyboard nav via tab.  
- **Active/Pressed**: Bg darken 20%, scale 0.98.  
- **Disabled**: Opacity 0.5, no pointer.  
- **Loading**: Overlay spinner, opacity 0.7 on parent.

**4.2 Animations & Transitions**  
- **Timing**: 200-300ms (Bootstrap default, e.g., collapse 0.35s).  
- **Easing**: ease-in-out; Custom: cubic-bezier(0.4, 0, 0.2, 1) for smooth.  
- **Micro-Interactions**: Button click: Scale + ripple; Accordion: Slide down/up.  
- **Page/Scroll**: Smooth scroll (html {scroll-behavior: smooth}); In-view fade for images (e.g., features-img).  
- **Principles**: Use for feedback (e.g., toast slide-in); Avoid excess (no hero parallax); Prioritize performance (<60fps).
