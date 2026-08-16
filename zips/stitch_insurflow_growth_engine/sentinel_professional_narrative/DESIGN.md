---
name: Sentinel Professional Narrative
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#4a5f85'
  primary: '#000f27'
  on-primary: '#ffffff'
  primary-container: '#0b2447'
  on-primary-container: '#778cb5'
  inverse-primary: '#b1c7f3'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000f23'
  on-tertiary: '#ffffff'
  tertiary-container: '#002547'
  on-tertiary-container: '#578ecf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b1c7f3'
  on-primary-fixed: '#011b3e'
  on-primary-fixed-variant: '#32476c'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#d3e4ff'
  tertiary-fixed-dim: '#a2c9ff'
  on-tertiary-fixed: '#001c38'
  on-tertiary-fixed-variant: '#004881'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  disclosure-text:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  bilingual-buffer: 1.2x
---

## Brand & Style

The design system is centered on **Expert-Led Assurance**. It transitions from a generic corporate identity to a personalized financial advisory aesthetic tailored for Angel Burgos. The brand personality is authoritative yet accessible, positioning the professional as a guardian of the client’s financial future.

The design style follows a **Modern Corporate** approach with **Minimalist** refinements. It prioritizes clarity and whitespace to de-escalate the stress often associated with financial planning. High-quality imagery of the agent, subtle textures, and a structured grid communicate stability. The visual language must feel expensive but transparent, evoking trust through precision and openness.

**Target Audience:** Families, business owners, and individuals seeking long-term financial security and bilingual expertise.
**Emotional Response:** Confidence, clarity, protection, and professional warmth.

## Colors

The palette is anchored by **Sentinel Navy** (#0B2447), representing depth and institutional stability. **Professional Gold** (#C5A059) is used as a signature accent for achievement and high-value highlights, while **Trust Teal** (#159895) provides a fresh, modern counterpoint for interactive elements and data visualization.

- **Primary:** Used for headers, primary buttons, and heavy branding elements.
- **Secondary (Gold):** Reserved for "Premium" calls to action, badges of expertise, and decorative borders.
- **Tertiary (Blue-Teal):** Used for information icons, secondary buttons, and link states.
- **Surface:** The background remains primarily off-white/light-gray to maintain a "paper" quality that suggests documentation and formal planning.

## Typography

This design system utilizes **Inter** exclusively to ensure maximum legibility across dense financial data. The typeface's tall x-height and neutral character provide a systematic feel that works well in both English and Spanish.

- **Headlines:** Use Bold and Semi-Bold weights to create a clear hierarchy.
- **Body Text:** Use Regular weight for general content. For Spanish strings, which often run 20-30% longer than English, ensure line lengths do not exceed 70 characters to maintain focus.
- **Disclosures:** A specific `disclosure-text` role is defined for regulatory and compliance footers, ensuring they remain legible but visually secondary.

## Layout & Spacing

A **12-column fixed grid** is used for desktop (1200px max width) to maintain a feeling of organized precision. On mobile, a single-column fluid layout with 16px side margins is standard.

**Bilingual Support Logic:** 
To accommodate Spanish translation expansion, UI components (buttons, input fields, labels) must implement a "bilingual-buffer." This means horizontal padding should be flexible or set to a minimum of 1.2x the standard English requirement to prevent text wrapping or overflow in buttons and navigation items. Avoid fixed-width containers for text-heavy UI elements.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Base):** Light gray background (#F8FAFC).
- **Level 1 (Cards):** Pure white surfaces with a thin 1px border (#E2E8F0).
- **Level 2 (Active/Hover):** Subtle, diffused shadows (0px 4px 12px rgba(11, 36, 71, 0.05)) to suggest interactivity without breaking the professional, flat aesthetic.
- **Overlay:** High-contrast navy or gold backgrounds for "Agent Profile" callouts to pop from the standard white/gray canvas.

## Shapes

The design system uses **Soft** geometry. A 4px (0.25rem) base radius communicates precision and discipline. Avoid fully rounded/pill shapes for buttons to maintain a more traditional professional appearance. 

- **Standard Elements (Buttons, Inputs):** 4px border radius.
- **Large Containers (Cards, Modals):** 8px border radius.
- **Images:** Agent headshots should be contained within subtle 8px rounded rectangles rather than circles to feel more architectural and grounded.

## Components

### Agent Profile Card
This is a signature component. It must feature a high-resolution portrait of Angel Burgos, his title, and bilingual indicators (e.g., "Hablo Español" badge in Gold). 
- **Layout:** Horizontal on desktop, vertical on mobile.
- **Styling:** Primary Navy background with White or Gold text to differentiate the agent's personal brand from general informational content.

### Compliance Disclosures
- **Styling:** Contained in a dedicated footer area with a light gray top-border. 
- **Typography:** Uses `disclosure-text`.
- **Constraint:** Must be visible on every financial product page without requiring a hover state, per regulatory standards.

### Buttons & Inputs
- **Primary Button:** Navy background, white text.
- **Secondary Button:** Gold border, Gold text.
- **Inputs:** High-contrast labels (Navy) with clear error states in a custom "Caution Red" to ensure accessibility.

### Bilingual Toggle
- A prominent language switcher in the utility navigation. Use clear text ("English" / "Español") rather than flags to respect linguistic nuances.