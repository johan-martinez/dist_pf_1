const express = require('express')
const app = express()
const uploader = require('./uploader')
const fs = require('fs')
const path = require('path')

const port= process.env.PORT || 3001

app.use(express.json())

//Uso publico de las imagenes http:.../nombredelarchivo.jpg|png|jpg
app.use('/', express.static('img'))

app.post('/',uploader.single('image'),(req,res)=>{
    try {
        res.send({path:req.file.path})
    } catch (error) {
        res.sendStatus(400)
    }
})



app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})