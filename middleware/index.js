const express = require('express')
const axios = require('axios')
const cors = require('cors')
const fs = require('fs')
const path = require('path');
var app = express()
var port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

var load_balancer = process.env.LOAD_BALANCER || 'http://localhost'
var img_server = process.env.IMG_SERVER || 'http://localhost:6000'

app.post('/save', async (req, res) => {
    try {
        let image_result = await axios.post(img_server, { img: req.body.img })
        await axios.post(load_balancer + '/save-data/',
            {
                name: req.body.name,
                city: req.body.city,
                image_path: image_result.data.path
            }
        )
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

app.get('/last-data', (req, res) => {
    axios.get(load_balancer + '/last-data/')
        .then(response => res.json(response.data))
        .catch(error => res.sendStatus(500))
})

app.get('/report', (req, res) => {
    axios({
        method: 'GET',
        url: load_balancer + '/report?city=' + req.query.city,
        responseType: 'arraybuffer',
        headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    }).then((result) => {
        var outputFilename = path.join(__dirname,`reports/${Date.now()}_report_${req.query.city}.xlsx`) ;
        fs.writeFileSync(outputFilename, result.data)
        await res.download(outputFilename, (err) => {
            if (err) res.sendStatus(500)
        });
        fs.unlinkSync(outputFilename)
    }).catch((err) => res.sendStatus(500))
})

app.listen(port, () => {
    console.log(`Middleware is running on port ${port}`)
    if(!fs.existsSync(path.join(__dirname,'reports'))){
        fs.mkdirSync(path.join(__dirname,'reports'))
    }
});