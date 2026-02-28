# Home Page Zoom-on-Scroll Interaction Design

**Date:** 2026-02-28
**Topic:** Adding zoom-in effects to components on scroll for the Home Page.

## 1. Goal
Implement a cohesive "pop-in" effect across major sections of the homepage. Components should scale up slightly (e.g., from 90-95% to 100%) and fade in as they are scrolled into the viewport, delivering a dynamic, polished experience consistent with a premium brand.

## 2. Architecture & Approach
We will leverage `framer-motion`, which is already heavily utilized in the project. The primary approach relies on the `whileInView` prop combined with `initial` and `transition`. 

Key components to update:
- `Services.jsx`: Add `scale` alongside `opacity` and `y` transformations on the service cards.
- `CTABanner.jsx`: Add `scale` to the entire banner block when it scrolls into view.
- `Industries.jsx`: Add `scale` for the header and/or the carousel container.
- `HomeSuccessStories.jsx`: Add `scale` to the section headers and potentially the background/wrapper of the scroller.
- `Contact.jsx` (if rendered on homepage): Add a gentle scale-in to the contact block/form as it enters the viewport.

## 3. Tech Stack
- React 19
- Framer Motion (`initial`, `whileInView`, `viewport={{ once: true }}`)
- Tailwind CSS

## 4. Testing
- Scroll down the page on desktop and mobile sizes to ensure the animation triggers correctly and smoothly.
- Ensure no layout shift (CLS) is caused by the scaling elements by wrapping them in appropriately sized containers if necessary.
