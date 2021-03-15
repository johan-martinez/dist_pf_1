const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const port= process.env.PORT || 6000
const internalIp = require('internal-ip');

const promBundle = require("express-prom-bundle")
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

let myIP=null
getIp()
async function getIp() {
    myIP= await internalIp.v4()
}

app.post('/', async (req,res)=>{
    var base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, '');
    let name = `${Date.now()}.jpeg`
    await fs.writeFileSync(path.join(__dirname,`public/${name}`), base64Data, 'base64', (err) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
    })
    res.json({path:`http://${myIP||'192.168.0.29'}:${port||6000}/${name}`})
})

app.listen(port,()=>{
    console.log(`Image Server running on port ${port}`)
    if(!fs.existsSync(path.join(__dirname,'public'))){
        fs.mkdirSync(path.join(__dirname,'public'))
    }
})