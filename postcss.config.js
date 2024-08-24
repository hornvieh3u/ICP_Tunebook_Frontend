module.exports = {
  plugins: [
    require('tailwindcss')({ watch: true }),
    require("autoprefixer"),
    require("cssnano")({
      preset: "default",
    }),
  ],
};
