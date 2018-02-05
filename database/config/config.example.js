export default {
  development: {
    uri: 'mongodb://localhost/cleverlab_dev'
  },

  test: {
    uri: 'mongodb://localhost/cleverlab_test'
  },

  production: {
    uri: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/cleverlab_prod'
  }
};