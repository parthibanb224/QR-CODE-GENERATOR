// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // Add PurgeCSS only in production
    ...(process.env.NODE_ENV === 'production'
      ? [require('@fullhuman/postcss-purgecss')({ content: ['./src/**/*.{js,jsx,ts,tsx}'] })]
      : []),
  ],
};
