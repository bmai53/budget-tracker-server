// const environment = process.env.NODE_ENV || 'development'
const environment = 'development'
const config = require('../knexfile')[environment]

module.exports = require('knex')(config)
