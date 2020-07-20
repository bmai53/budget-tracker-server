const Express = require('express')
const app = Express()
const port = 3000

// Parsing data
app.use(express.json())


// routes
app.get('/', (req, res)=>{
    res.send('Hello world')
})

app.listen(port, ()=>{
    console.log('Server running on port', port)
})