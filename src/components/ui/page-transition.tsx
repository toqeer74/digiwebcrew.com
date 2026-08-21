"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Fades the page in on client-side navigation.
 *
 * The initial load deliberately does NOT animate. This wrapper previously used
 * initial={{ opacity: 0 }} unconditionally, which shipped every server-rendered
 * page with the entire body at opacity:0 — so nothing was visible until the JS
 * bundle downloaded, React hydrated, and a 0.4s animation ran. Largest
 * Contentful Paint ignores elements at zero opacity, so LCP was pinned to that
 * whole chain: 11.8s on a throttled mobile profile, against a 2.5s target.
 *
 * On first paint we render with `initial={false}` so the SSR'd markup is
 * visible immediately. Subsequent route changes still animate.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  // Flips after the first commit, so the first paint renders with
  // initial={false} and every later navigation animates normally.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={hasMounted ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1], // Premium ease-out
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
