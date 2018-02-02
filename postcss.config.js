module.exports = {
  plugins: [
    require('autoprefixer')({ /* ...options */ }), // vendor prefix on css
    require('postcss-font-magician')({ hosted: ['./static/fonts'] })
  ]
};