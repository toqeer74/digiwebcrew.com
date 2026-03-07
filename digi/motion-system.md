# Digital Web Crew - Motion & Animation System

## Motion Principles

Our motion system is built on five core principles that guide every animation decision:

### 1. Purposeful
Every animation serves a function—guiding attention, providing feedback, or indicating state change. Never animate for decoration alone.

### 2. Fast
Most animations complete in 150-300ms. Users should never wait for motion to finish.

### 3. Smooth
Use appropriate easing functions to create natural, fluid motion that feels responsive.

### 4. Restrained
One animation at a time. No competing motion that distracts from the primary action.

### 5. Respectful
Honor `prefers-reduced-motion`. Provide static alternatives for users who prefer less motion.

---

## Easing Functions

| Name | CSS Value | Usage |
|------|-----------|-------|
| **Ease Out** | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the viewport |
| **Ease In** | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting the viewport |
| **Ease In Out** | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes, toggles |
| **Spring** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful interactions, buttons |
| **Bounce** | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Attention-grabbing moments |

---

## Animation Duration Scale

| Token | Duration | Usage |
|-------|----------|-------|
| `duration-instant` | 50ms | Micro-feedback (button press) |
| `duration-fast` | 150ms | Hover states, small transitions |
| `duration-normal` | 200ms | Standard transitions |
| `duration-slow` | 300ms | Larger elements, page transitions |
| `duration-slower` | 500ms | Complex animations |
| `duration-slowest` | 800ms | Number count-ups, emphasis |

---

## Animation Patterns

### Page Transitions

```tsx
// Page transition wrapper
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] }
  }
};

<motion.div
  initial="initial"
  animate="animate"
  exit="exit"
  variants={pageVariants}
>
  {children}
</motion.div>
```

### Scroll Reveal

```tsx
// Element reveals on scroll
const scrollRevealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] }
  }
};

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={scrollRevealVariants}
>
  Content
</motion.div>
```

### Staggered Children

```tsx
// Parent container with staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] }
  }
};

<motion.div variants={containerVariants}>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## Micro-interactions

### Button Interactions

```tsx
// Button with hover and tap animations
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
>
  Click Me
</motion.button>
```

### Card Hover

```tsx
// Card with lift effect on hover
<motion.div
  whileHover={{ 
    y: -4,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
  }}
  transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
>
  Card Content
</motion.div>
```

### Input Focus

```tsx
// Input with focus animation
<motion.input
  initial={{ borderColor: "#2D2D44" }}
  whileFocus={{ 
    borderColor: "#0082FF",
    boxShadow: "0 0 0 2px rgba(0, 130, 255, 0.2)"
  }}
  transition={{ duration: 0.15 }}
/>
```

---

## AI-Specific Animations

### Thinking State (Pulsing Dots)

```tsx
// Three dots with staggered pulse animation
const dotVariants = {
  animate: {
    opacity: [0.3, 1, 0.3],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

<div className="flex gap-1">
  {[0, 1, 2].map(i => (
    <motion.div
      key={i}
      className="w-2 h-2 bg-blue rounded-full"
      variants={dotVariants}
      animate="animate"
      transition={{ delay: i * 0.15 }}
    />
  ))}
</div>
```

### Progress/Generating

```tsx
// Shimmer progress bar
<motion.div
  className="h-1 bg-gradient-to-r from-transparent via-blue to-transparent"
  animate={{
    x: ["-100%", "100%"]
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "linear"
  }}
/>
```

### Score Count-Up

```tsx
// Animated number counter
import { useMotionValue, useTransform, animate } from "framer-motion";

function AnimatedScore({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.8,
      ease: [0, 0, 0.2, 1]
    });
    return controls.stop;
  }, [value]);
  
  return <motion.span>{rounded}</motion.span>;
}
```

---

## Chatbot Animations

### Message Entry

```tsx
// Chat message slide-in
const messageVariants = {
  initial: { opacity: 0, x: -20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }
  }
};

<motion.div
  variants={messageVariants}
  initial="initial"
  animate="animate"
>
  {message.content}
</motion.div>
```

### Typing Indicator

```tsx
// Typing dots animation
const typingVariants = {
  animate: {
    y: [0, -4, 0],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

<div className="flex gap-1 p-3">
  {[0, 1, 2].map(i => (
    <motion.div
      key={i}
      className="w-2 h-2 bg-silver rounded-full"
      variants={typingVariants}
      animate="animate"
      transition={{ delay: i * 0.1 }}
    />
  ))}
</div>
```

---

## Loading States

### Skeleton Loading

```tsx
// Skeleton placeholder with shimmer
const shimmerVariants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

<motion.div
  className="h-4 rounded bg-gradient-to-r from-steel via-graphite to-steel bg-[length:200%_100%]"
  variants={shimmerVariants}
  animate="animate"
/>
```

### Spinner

```tsx
// Loading spinner
<motion.div
  className="w-6 h-6 border-2 border-steel border-t-blue rounded-full"
  animate={{ rotate: 360 }}
  transition={{
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }}
/>
```

---

## Performance Constraints

### Do's

- ✅ Use `transform` and `opacity` only (GPU accelerated)
- ✅ Use `will-change` sparingly and remove after animation
- ✅ Test on low-end devices
- ✅ Use `layoutId` for shared element transitions
- ✅ Implement `prefers-reduced-motion` support

### Don'ts

- ❌ Animate layout properties (width, height, top, left)
- ❌ Use blur filters during animation
- ❌ Animate multiple properties simultaneously
- ❌ Run animations on scroll without throttling
- ❌ Ignore reduced motion preferences

---

## Reduced Motion Support

```tsx
// Hook for reduced motion preference
import { useReducedMotion } from "framer-motion";

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
    >
      Content
    </motion.div>
  );
}
```

---

## Framer Motion Configuration

### Recommended Setup

```tsx
// lib/motion.ts
export const transitions = {
  fast: { duration: 0.15, ease: [0, 0, 0.2, 1] },
  normal: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  slow: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  spring: { type: "spring", stiffness: 400, damping: 30 }
};

export const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};
```

### Usage Example

```tsx
import { motion } from "framer-motion";
import { transitions, variants, staggerContainer } from "@/lib/motion";

export function FeatureSection() {
  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <motion.h2 variants={variants.slideUp} transition={transitions.normal}>
        Features
      </motion.h2>
      
      <div className="grid grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.id}
            variants={variants.slideUp}
            transition={{ ...transitions.normal, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
```

---

## Animation Audit Checklist

Before shipping any animation:

- [ ] Animation has a clear purpose
- [ ] Duration is appropriate (150-300ms typical)
- [ ] Easing feels natural
- [ ] Works with `prefers-reduced-motion`
- [ ] Doesn't cause layout shifts
- [ ] Performs at 60fps on target devices
- [ ] Doesn't distract from primary content
- [ ] Has appropriate fallback for errors
