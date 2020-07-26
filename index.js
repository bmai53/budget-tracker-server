const Express = require('express')
const app = Express()
require('dotenv').config()

const port = process.env.PORT || 5000

// Parsing data
app.use(Express.json())

// cors
const cors = require('cors')
app.use(cors())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    next();
});

// passport
const passport = require('passport')
require('./passport_config')
app.use(passport.initialize())

// routes
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)

app.get('/', (req, res) => {
    res.status(200).send('Hello world')
})


app.listen(port, ()=>{
    console.log(`[${process.env.NODE_ENV}] Server running on port ${port}`)
})

module.exports = app