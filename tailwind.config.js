module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { brandBrown: "#665434", brandYellow: "#F7B929" },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.08)", hover: "0 12px 40px rgba(0,0,0,.14)" },
      borderRadius: { xl:"1rem","2xl":"1.25rem" },
      backgroundImage: {
        'brand-radial': "radial-gradient(900px 500px at 10% 10%, rgba(247,185,41,.10), transparent 60%), radial-gradient(800px 600px at 90% 10%, rgba(102,84,52,.09), transparent 60%)",
        'brand-gradient': "linear-gradient(135deg, #FFF 0%, #FAFAF9 40%, #F8F7F5 100%)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
}