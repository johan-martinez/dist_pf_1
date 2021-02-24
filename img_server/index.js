const { Console } = require('console')
const express = require('express')
const app = express()
//const uploader = require('./uploader')
const fs = require('fs')
const path = require('path')
const port= process.env.PORT || 6000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.post('/', async (req,res)=>{
    var base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, '');
    let name = `${Date.now()}.jpeg`
    await fs.writeFileSync(path.join(__dirname,`public/${name}`), base64Data, 'base64', (err) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
    })
    res.json({path:path.join(__dirname,`public/${name}`)})
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
    if(!fs.existsSync(path.join(__dirname,'public'))){
        fs.mkdirSync(path.join(__dirname,'public'))
    }
})