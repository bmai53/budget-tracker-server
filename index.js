const Express = require('express')
const app = Express()
// require('dotenv').config()

const port = process.env.PORT || 5000

// Parsing data
app.use(Express.json())

// cors
const cors = require('cors')
app.options('*', cors())

// passport
const passport = require('passport')
require('./passport_config')
app.use(passport.initialize())

// routes
const authRoutes = require('./routes/authRoutes')
app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/auth', authRoutes)


app.listen(port, ()=>{
    console.log('Server running on port', port)
})