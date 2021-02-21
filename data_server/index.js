const express = require('express')
const userDB = require('./db/user')
const cors = require('cors')
const db = require('./db/connection')

db()

var app = express()
var port = 4000

app.use(express.json())
app.use(cors())


app.use('/db', userDB)


app.listen(port, ()=>{
    console.log(`ServerData is running on port ${port}`)
});