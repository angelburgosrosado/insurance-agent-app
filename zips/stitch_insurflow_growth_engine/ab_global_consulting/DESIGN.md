---
name: AB Global Consulting
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#171c1f'
  on-tertiary-container: '#808488'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#dfe3e7'
  tertiary-fixed-dim: '#c3c7cb'
  on-tertiary-fixed: '#171c1f'
  on-tertiary-fixed-variant: '#43474b'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered for **AB Global Consulting**, focusing on high-stakes financial protection through Life, Health, and Annuity products. The target audience includes individuals and families seeking long-term security and retirement stability. 

The aesthetic is **Corporate Modern**—a blend of high-end financial services authority and approachable consulting. The UI must evoke feelings of stability, expertise, and precision. To facilitate its bilingual (English/Spanish) requirement, the layout prioritizes legibility and clarity to accommodate varying text lengths across languages without losing visual balance. All visual metaphors should lean toward growth, longevity, and legacy, strictly avoiding the transactional nature of property and casualty insurance.

## Colors

The palette is anchored by **Trustworthy Navy** (#0F172A), which serves as the primary driver for headers, primary buttons, and critical branding elements to establish immediate authority. **Professional Blue** (#2563EB) acts as the accent color for call-to-actions and interactive states, signaling progress and modern capability.

A secondary layer of **Slate Grey** (#64748B) is used for body text and supportive icons to maintain high contrast and readability. The background strategy utilizes a clean, off-white "Paper" tint (#F8FAFC) to differentiate the interface from standard corporate white, adding a premium feel. Success and growth metrics should utilize a deep emerald green, while warnings are kept subtle to maintain a calm, non-alarmist environment.

## Typography

This design system utilizes a dual-font strategy to balance modernity with professional utility. **Manrope** is used for headlines to provide a refined, geometric, and contemporary look that builds trust. **Work Sans** is used for all body copy and UI labels; its slightly wider apertures ensure maximum legibility for complex financial terms and bilingual content.

To support high conversion, "Display" styles use tighter letter spacing for a punchy, authoritative look. For mobile views, headline sizes are aggressively scaled down to ensure that longer Spanish phrases do not wrap awkwardly or break the visual flow of the consultation forms.

## Layout & Spacing

The design system employs a **Fixed Grid** model on desktop to maintain a sense of structured, high-end editorial layout, transitioning to a fluid model on mobile devices. A strict 8px base unit governs all dimensions.

- **Desktop (1280px+):** 12-column grid with 24px gutters. Content is centered with generous 40px side margins to create a "safe" and spacious feeling.
- **Tablet (768px - 1279px):** 8-column grid. Margins reduce to 24px.
- **Mobile (< 767px):** 4-column fluid grid. Margins are 16px. Vertical rhythm is increased between sections to prevent "wall of text" fatigue, which is crucial for educational content regarding Annuities and Life Insurance.

## Elevation & Depth

To maintain a credible and institutional feel, this design system avoids heavy shadows. Instead, it utilizes **Tonal Layers** and **Low-Contrast Outlines**.

Depth is communicated through subtle shifts in background color (e.g., placing a white card on a light slate background). When elevation is required for interactive elements like modals or dropdowns, use a "Soft-Focus" shadow: a very high blur radius (24px+) with a very low opacity (4-6%) navy tint. This creates a subtle lift that feels architectural rather than digital.

## Shapes

The shape language is **Soft (0.25rem)**. This decision preserves the "seriousness" of a global consulting firm while subtly signaling that the brand is modern and accessible. 

- **Cards and Inputs:** Use the standard 4px (0.25rem) radius.
- **Primary Buttons:** May use a slightly increased 8px radius to differentiate them as the primary conversion drivers.
- **Icon Containers:** Should maintain the same 4px radius to ensure a cohesive, "blocked" visual language across the interface.

## Components

### Buttons
Primary buttons use the Trustworthy Navy background with white text. Hover states shift to Professional Blue. The design avoids "ghost" buttons for primary actions to ensure clear conversion paths.

### Input Fields
Fields must have high-contrast labels (Work Sans Bold). Given the bilingual nature, placeholder text should be avoided in favor of persistent labels to ensure clarity if a user switches languages mid-form.

### Cards
Cards are the primary vehicle for "Product Tiers" (Life vs. Health vs. Annuities). They feature a 1px border in a light grey-blue tint rather than a shadow. Header sections of cards may use a subtle primary-color top border (2px) to denote importance.

### Trust Indicators
A specific component for "License 0215" verification and bilingual badges. These should be styled as small, subtle chips with a light slate background and navy text, placed near call-to-action buttons to reinforce credibility.

### Benefit Lists
Utilize custom checkmark icons in Professional Blue. Avoid standard bullets to maintain the premium consulting aesthetic.