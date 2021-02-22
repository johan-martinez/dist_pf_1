const express = require('express')
const axios = require('axios')
const cors = require('cors')
const json2xls = require('json2xls')
const fs = require('fs')


var app = express()
var port = 5000
var data_server_url = 'http://localhost:4000/db'

app.use(cors())
app.use(express.json())


// obtener reporte xlsx
app.get('/report', (req, res) => {
    axios.get(data_server_url + '?city=' + req.query.city)
        .then(response => {
            var xls = json2xls(response.data);
            let nameFile = 'reports/' + req.query.city + Date.now() + '.xlsx'
            fs.writeFileSync(nameFile, xls, 'binary');
            return res.sendFile(nameFile, { root: __dirname }, (err) => {
                if (err) res.sendStatus(500)
                fs.unlinkSync(nameFile)
            })
        }).catch(error => res.sendStatus(500))
});

// guardar info
app.post('/save-info', (req, res) => {
    axios.post(data_server_url, req.body)
        .then(response => res.sendStatus(200))
        .catch(error => res.sendStatus(500))
});

// devuelve json con los datos en caché o la image con el circulito de reporte
app.get('/last-data', (req, res) => {
    axios.get(data_server_url + '/last')
        .then(response => res.json(response.data))
        .catch(error => res.sendStatus(500))
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});