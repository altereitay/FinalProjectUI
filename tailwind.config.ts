const config = {
    darkMode:'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/styles/**/*.css"
    ],
    theme: {
        extend: {
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.2s ease-out",
            },
            colors: {
                primary: "hsl(243, 75%, 59%)",        // Indigo-600
                "primary-foreground": "#ffffff",
                secondary: "hsl(210, 40%, 96%)",
                "secondary-foreground": "hsl(222, 47%, 11%)",
                accent: "hsl(210, 40%, 96%)",
                "accent-foreground": "hsl(222, 47%, 11%)",
                destructive: "hsl(0, 84%, 60%)",
                "destructive-foreground": "#ffffff",
                muted: "#f3f4f6",
                "muted-foreground": "#6b7280",
                border: "#e5e7eb",
                input: "#f9fafb",
                ring: "hsl(243, 75%, 59%)",
                background: "#ffffff",
                foreground: "#111827",
                white: '#ffffff',
                black: '#000000',
            },
        },
    },
    plugins: [],
};

export default config;
