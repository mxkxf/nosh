module.exports = {
  plugins: [
    "tailwindcss",
    "postcss-nested",
    "autoprefixer",
    process.env.NODE_ENV === "production"
      ? [
          "@fullhuman/postcss-purgecss",
          {
            content: ["./src/**/*.{js,jsx,ts,tsx}"],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          },
        ]
      : undefined,
  ].filter(Boolean),
};
