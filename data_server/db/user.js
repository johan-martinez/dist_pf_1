const User = require('./user_model')
const route = require('express').Router()

// obtener todos datos
route.get('/', async (req, res) => {
    let result = await User.find({}, { '_id': 0, '__v': 0 })
    res.send(result)
});

// agregar datos. 
// body format {name : "", city:"", image_path:"" }
route.post('/', async (req, res) => {
    try {
        let userModel = new User(req.body)
        await userModel.save()
        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
});

// caché
route.get('/last', async (req, res) => {
    res.json( [ {city:'Bogotá', cases: 20}, {city:'Tunja', cases: 10}, {city:'Tolima', cases: 1} ])
});

module.exports = route