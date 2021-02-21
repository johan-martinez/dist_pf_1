const express = require('express')
const app = express()
//const uploader = require('./uploader')
const fs = require('fs')
const path = require('path')
const port= process.env.PORT || 6000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.post('/', (req,res)=>{
    var base64Data = req.body.img.replace(/^data:image\/png;base64,/, '');
    let name = `${new Date()}.png`
    fs.writeFile('./public/' + name , base64Data, 'base64', (err) => {
        if (err) res.sendStatus(500)
        else res.json({path:name})
    });
})

/*
app.use('/', express.static('img'))

app.post('/', uploader.single('image'),(req,res)=>{
    try {
        res.send({path:req.file.path})
    } catch (error) {
        res.sendStatus(400)
    }
})*/


app.listen(port,()=>{
    console.log(`Image Server running on port ${port}`)
})