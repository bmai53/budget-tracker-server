const Express = require('express')
const app = Express()
require('dotenv').config()

const port = process.env.PORT || 5000

// Parsing data
app.use(Express.json())

// remove x-powered-by Express
app.disable('x-powered-by');

// cors
const cors = require('cors')
app.use(cors())

// passport
const passport = require('passport')
require('./passport_config')
app.use(passport.initialize())

// routes
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const activityRoutes = require('./routes/activityRoutes')

app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)
app.use('/activity', activityRoutes)

app.get('/', (req, res) => {
    res.status(200).send('Hello world')
})


app.listen(port, ()=>{
    console.log(`[${process.env.NODE_ENV}] Server running on port ${port}`)
})

module.exports = app