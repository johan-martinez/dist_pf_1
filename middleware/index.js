const express = require('express')
const axios = require('axios')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
var app = express()
var port = 3000
const logger = require('./Logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cors())

var load_balancer = process.env.LOAD_BALANCER || 'http://localhost'
var img_server = process.env.IMG_SERVER || 'http://localhost:6000'


app.post('/log', (req,res)=>{
    logger.error(`[${req.connection.remoteAddress}]:${req.body.msg}`)
    res.send(200)
})

app.post('/save', async (req, res) => {
        axios.post(img_server, { img: req.body.img })
        .then(()=>{
            axios.post(load_balancer + '/save-data/',
                {
                    name: req.body.name,
                    city: req.body.city,
                    image_path: image_result.data.path
                }
            )
            .then(()=>{res.sendStatus(200)})
        })
        .catch(err=>{
            logger.error(`[middle]:${err.toString()}`)
            res.sendStatus(500)
        })
    
})

app.get('/last-data', (req, res) => {
    axios.get(load_balancer + '/last-data/')
        .then(response => res.json(response.data))
        .catch(err=>{
            logger.error(`[middle]:${err.messagge}`)
            res.sendStatus(500)
        })
})

app.get('/report', async (req, res) => {
    axios({
        method: 'GET',
        url: load_balancer + '/report?city=' + req.query.city,
        responseType: 'arraybuffer',
        headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    }).then(async (result) => {
        var outputFilename = path.join(__dirname,`reports/${Date.now()}_report_${req.query.city}.xlsx`) ;
        fs.writeFileSync(outputFilename, result.data)
        await res.download(outputFilename, (err) => {
            if (err) res.sendStatus(500)
            else fs.unlinkSync(outputFilename)
        });
    }).catch(err=>{
        logger.error(`[middle]:${err.toString()}`)
        res.sendStatus(500)
    })
})

app.listen(port, () => {
    console.log(`Middleware is running on port ${port}`)
    if(!fs.existsSync(path.join(__dirname,'reports'))){
        fs.mkdirSync(path.join(__dirname,'reports'))
    }
});