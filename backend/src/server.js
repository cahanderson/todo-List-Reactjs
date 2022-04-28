const express = require('express')
const todos = require('./routes')
const app = express()
const cors = require('cors')

app.use(cors());
app.use(express.json())
app.use(todos);

app.get('/health',(req, res)=>{
    return res.json('up')
})

app.listen(3333, ()=> console.log('hello'))