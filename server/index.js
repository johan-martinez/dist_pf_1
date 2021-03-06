const express = require('express')
const axios = require('axios')
const cors = require('cors')
const json2xls = require('json2xls')
const fs = require('fs')
const path = require('path');

var app = express()
var port = 5000
var data_server_url = process.env.DATA_SERVER || 'http://localhost:4000/db'
var middle_url = process.env.MIDDLEWARE || 'http://localhost:3000/'

app.use(cors())
app.use(express.json())

function sendError(msg){
    axios.post(`${middle_url}log`,{msg:msg})
}

app.get('/report', (req, res) => {
    axios.get(data_server_url + '?city=' + req.query.city)
        .then(response => {
            var xls = json2xls(response.data);
            let nameFile = path.join(__dirname,`reports/${req.query.city}${Date.now()}.xlsx`)
            fs.writeFileSync(nameFile, xls, 'binary');
            return res.sendFile(nameFile, (err) => {
                if (err) throw err
                fs.unlinkSync(nameFile)
            })
        })
    .catch(error => {
        sendError(error.message)
        res.sendStatus(500)
    })
})


// obtener reporte xlsx
/**
 * 
 app.get('/report', async (req, res) => {
     axios.get(data_server_url + '?city=' + req.query.city)
         .then(async (response) => {
             var xls = json2xls(response.data);
             let nameFile = 
             await fs.writeFile(nameFile, xls, 'binary',()=>{});
             res.sendFile(nameFile, (err) => {
                 if (err) {
                     sendError(err.message)
                     res.sendStatus(400)//enviar error
                 }else{
                     fs.unlinkSync(nameFile)
                 }
             })
         }).catch(error => {
             sendError(error.message)
             res.sendStatus(400)
         })
 });
 */

// guardar info
app.post('/save-data', (req, res) => {
    axios.post(data_server_url, req.body)
        .then(response => res.sendStatus(200))
        .catch(error => {
            sendError(error.message)
            res.sendStatus(400)
        })
});

// devuelve json con los datos en caché o la image con el circulito de reporte
app.get('/last-data', (req, res) => {
    axios.get(data_server_url + '/last')
        .then(response => res.json(response.data))
        .catch(error => {
            sendError(error.message)
            res.sendStatus(400)
        })
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    if(!fs.existsSync(path.join(__dirname,'reports'))){
        fs.mkdirSync(path.join(__dirname,'reports'))
    }
});