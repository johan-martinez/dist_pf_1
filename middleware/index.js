const express = require('express')
const axios = require('axios')
const cors = require('cors')

var app = express()
var port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


var load_balancer = 'http://192.168.1.80'

var img_server = 'http://localhost:6000'

app.post('/save', async (req, res) => {
    try {
        let image_result = await axios.post(img_server, { img: req.body.img })
        console.log(image_result.data.path)
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



app.listen(port, () => {
    console.log(`Middleware is running on port ${port}`)
});