const express = require('express')
const api = require('./api_rest')
const cors = require('cors')
const db = require('./db/connection')

var app = express()
var port = 4000

db()

app.use(express.json())
app.use(cors())
app.use('/db', api)

app.listen(port, ()=>{
    console.log(`ServerData is running on port ${port}`)
});