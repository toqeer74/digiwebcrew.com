import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1170px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
      },
      colors: {
        raly: {
          primary: "#024d94",
          accent: "#f8d171",
          text: "#555555",
          base: "#ffffff",
          subtle: "#fafafa",
          deep: "#02407b",
        },
        // Digi Web Crew Brand Colors
        midnight: {
          DEFAULT: '#0F172A',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        slate: {
          DEFAULT: '#1E293B',
          light: '#334155',
          dark: '#0F172A',
        },
        electric: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
        },
        brand: {
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
          slate: "#1A1A2E",
          steel: "#2D2D44",
          graphite: "#4A4A5A",
          silver: "#8A8A9A",
          mist: "#B8B8C4",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "slide-right": {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 8s infinite linear",
        "slide-right": "slide-right 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
