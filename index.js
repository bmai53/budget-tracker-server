const Express = require('express')
const app = Express()
require('dotenv')
const port = process.env.PORT || 3000

// Parsing data
app.use(Express.json())


// routes
app.get('/', (req, res)=>{
    res.send('Hello world')
})

app.listen(port, ()=>{
    console.log('Server running on port', port)
})