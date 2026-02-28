# Zoom-on-Scroll Implementation Plan

> **For Antigravity:** REQUIRED SUB-SKILL: Load executing-plans to implement this plan task-by-task.

**Goal:** Implement a subtle scale-up and fade-in ("pop-in") effect when components are scrolled into view on the homepage.

**Architecture:** We will modify existing Framer Motion `motion.div` declarations to include `scale` in the `initial` and `whileInView` props. We will add `motion.div` to components that don't have it yet to animate the entire blocks for a premium feel.

**Tech Stack:** React, Framer Motion

---

### Task 1: Add Zoom to Services Cards

**Files:**
- Modify: `src/components/Services.jsx:121-131`

**Step 1: Write explicit zoom-in for Services**

In `src/components/Services.jsx`, find the `motion.div` inside the map array for `services`. 
Update the `initial` and `whileInView` properties:
```javascript
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    whileHover={{ y: isActive ? 0 : -6 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.07,
                                        y: { duration: 0.2, ease: "easeOut" },
                                        scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                                    }}
                                    viewport={{ once: true, margin: "-50px" }}
```

**Step 2: Commit**
```bash
git add src/components/Services.jsx
git commit -m "feat: add zoom-in effect to services cards"
```

---

### Task 2: Add Zoom to CTA Banner

**Files:**
- Modify: `src/components/CTABanner.jsx:19-24`

**Step 1: Write explicit zoom-in for CTABanner**

In `src/components/CTABanner.jsx`, find the wrapping `motion.div` for the banner box.
Update the properties:
```javascript
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="container mx-auto max-w-7xl relative z-10"
            >
```

**Step 2: Commit**
```bash
git add src/components/CTABanner.jsx
git commit -m "feat: add zoom-in effect to CTA banner"
```

---

### Task 3: Add Zoom to Industries Carousel Wrapper

**Files:**
- Modify: `src/components/Industries.jsx`

**Step 1: Update the Industries Carousel Container**

In `src/components/Industries.jsx`, let's wrap the `<div className="relative overflow-hidden -mx-4 px-4">` in a `motion.div` so the whole carousel fades and scales in when scrolling.

Change:
```javascript
                {/* Carousel Container */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative overflow-hidden -mx-4 px-4"
                >
                    <div
```
(Don't forget to close with `</motion.div>` after the `</div>` for the carousel track.)

**Step 2: Commit**
```bash
git add src/components/Industries.jsx
git commit -m "feat: add zoom-in effect to industries container"
```

---

### Task 4: Add Zoom to Home Success Stories Header and Scroller

**Files:**
- Modify: `src/components/HomeSuccessStories.jsx`

**Step 1: Update the Headers and Scroller Containers**

The header `h2` and the `div` scrollers should come in with a scale.
For the `h2`:
```javascript
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
```

For the Desktop CTA button wrapper:
```javascript
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="hidden md:block shrink-0"
                    >
```

Wrap both the mobile and desktop scroll container wrappers (the divs with `ref={mobileRef}` and `ref={desktopRef}`) in a scale wrapper, or replace them with `motion.div`. Note we are passing a `ref` variable to them, so we need:
```javascript
                <motion.div
                    ref={mobileRef}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="md:hidden overflow-x-auto scrollbar-none -mx-6 px-6 cursor-grab active:cursor-grabbing"
                >
```
and
```javascript
                <motion.div
                    ref={desktopRef}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="hidden md:block overflow-x-auto scrollbar-none -mx-6 px-6 cursor-grab active:cursor-grabbing"
                >
```

**Step 2: Commit**
```bash
git add src/components/HomeSuccessStories.jsx
git commit -m "feat: add zoom-in effect to success stories sections"
```

---

### Task 5: Add Zoom to Contact Section on Home

**Files:**
- Modify: `src/components/Contact.jsx` (which is shared but used on the homepage)

**Step 1: Update the Contact wrapper**

First, ensure `motion` is imported from `framer-motion` in `Contact.jsx` if it isn't.
Then change the wrapping `div className="grid md:grid-cols-2 gap-12 lg:gap-20"` to a `motion.div`:
```javascript
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-2 gap-12 lg:gap-20"
                >
```
And close with `</motion.div>`.

**Step 2: Commit**
```bash
git add src/components/Contact.jsx
git commit -m "feat: add zoom-in effect to contact section"
```

---
