module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(210, 20%, 90%)",
        input: "hsl(210, 20%, 95%)",
        ring: "hsl(199, 89%, 48%)",
        background: "hsl(210, 40%, 98%)",
        foreground: "hsl(210, 20%, 15%)",
        primary: {
          DEFAULT: "hsl(199, 89%, 48%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(210, 100%, 95%)",
          foreground: "hsl(199, 89%, 48%)",
        },
        destructive: {
          DEFAULT: "hsl(354, 70%, 54%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        muted: {
          DEFAULT: "hsl(210, 40%, 96%)",
          foreground: "hsl(210, 15%, 50%)",
        },
        accent: {
          DEFAULT: "hsl(199, 89%, 48%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        success: {
          DEFAULT: "hsl(142, 71%, 45%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        warning: {
          DEFAULT: "hsl(45, 100%, 51%)",
          foreground: "hsl(0, 0%, 20%)",
        },
        info: {
          DEFAULT: "hsl(213, 85%, 51%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(210, 20%, 15%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(0, 0%, 20%)",
        },
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      fontSize: {
        'h1': 'clamp(32px, 5vw, 48px)',
        'h2': '36px',
        'h3': '28px',
        'body': '16px',
        'small': '14px',
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      borderRadius: {
        lg: "12px",
        md: "6px",
        sm: "4px",
      },
      boxShadow: {
        'soft-card': '0 2px 20px rgba(14, 165, 233, 0.08)',
        'navbar': '0 1px 3px rgba(14, 165, 233, 0.1)',
        'modal': '0 8px 32px rgba(14, 165, 233, 0.15)',
        'button': '0 4px 12px rgba(14, 165, 233, 0.25)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.3)',
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "gradient": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: "0.3",
          },
          "50%": {
            opacity: "0.6",
          },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
        "float": "float 3s ease-in-out infinite",
        "gradient": "gradient 3s ease infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
