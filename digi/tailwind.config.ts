import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Color System
      colors: {
        // Primary
        navy: {
          DEFAULT: "#0A0A0F",
          light: "#1A1A2E",
          dark: "#050508",
        },
        blue: {
          DEFAULT: "#0082FF",
          dark: "#0066CC",
          light: "#4DA3FF",
          50: "#E6F4FF",
          100: "#B3DEFF",
          200: "#80C8FF",
          300: "#4DA3FF",
          400: "#1A8CFF",
          500: "#0082FF",
          600: "#0066CC",
          700: "#004D99",
          800: "#003366",
          900: "#001A33",
        },
        // Secondary
        slate: "#1A1A2E",
        steel: "#2D2D44",
        graphite: "#4A4A5A",
        silver: "#8A8A9A",
        mist: "#B8B8C4",
        // Semantic
        success: {
          DEFAULT: "#00C853",
          light: "#E6F9EE",
        },
        warning: {
          DEFAULT: "#FFB300",
          light: "#FFF5E0",
        },
        error: {
          DEFAULT: "#FF3D71",
          light: "#FFE8EE",
        },
        info: {
          DEFAULT: "#00B0FF",
          light: "#E6F7FF",
        },
      },
      
      // Typography
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Consolas",
          "Monaco",
          "monospace",
        ],
      },
      fontSize: {
        hero: ["4rem", { lineHeight: "1.1", fontWeight: "800" }],
        h1: ["3rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["2.25rem", { lineHeight: "1.25", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        h5: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],
        xs: ["0.625rem", { lineHeight: "1.4", fontWeight: "400" }],
      },
      
      // Spacing (4px grid)
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      
      // Border Radius
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      
      // Shadows
      boxShadow: {
        none: "none",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        glow: "0 0 20px rgba(0, 130, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(0, 130, 255, 0.4)",
      },
      
      // Animations
      animation: {
        "fade-in": "fadeIn 200ms ease-out forwards",
        "fade-out": "fadeOut 150ms ease-in forwards",
        "slide-up": "slideUp 200ms ease-out forwards",
        "slide-down": "slideDown 200ms ease-out forwards",
        "scale-in": "scaleIn 200ms ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s infinite",
        shimmer: "shimmer 1.5s linear infinite",
        "dots-pulse": "dotsPulse 0.6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        dotsPulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
      
      // Transitions
      transitionDuration: {
        instant: "50ms",
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
        slower: "500ms",
        slowest: "800ms",
      },
      transitionTimingFunction: {
        "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
        "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
        "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      
      // Z-Index Scale
      zIndex: {
        hide: "-1",
        base: "0",
        dock: "10",
        dropdown: "1000",
        sticky: "1100",
        banner: "1200",
        overlay: "1300",
        modal: "1400",
        popover: "1500",
        skipLink: "1600",
        toast: "1700",
        tooltip: "1800",
      },
      
      // Background Image Utilities
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        shimmer:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
      },
      backgroundSize: {
        shimmer: "200% 100%",
      },
    },
  },
  
  // Plugins
  plugins: [
    require("tailwindcss-animate"),
    
    // Custom plugin for additional utilities
    function ({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        // Text utilities
        ".text-balance": {
          textWrap: "balance",
        },
        
        // Animation utilities
        ".animation-paused": {
          animationPlayState: "paused",
        },
        ".animation-running": {
          animationPlayState: "running",
        },
        
        // GPU acceleration
        ".gpu": {
          transform: "translateZ(0)",
        },
        
        // Focus ring
        ".focus-ring": {
          outline: "none",
          ring: "2px",
          ringColor: "rgba(0, 130, 255, 0.5)",
          ringOffset: "2px",
          ringOffsetColor: "#0A0A0F",
        },
        
        // Scrollbar styling
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          scrollbarWidth: "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
        
        // Line clamp utilities
        ".line-clamp-1": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "1",
        },
        ".line-clamp-2": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2",
        },
        ".line-clamp-3": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "3",
        },
      });
    },
  ],
};

export default config;
