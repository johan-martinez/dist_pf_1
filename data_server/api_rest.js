const User = require('./db/user_model')
const route = require('express').Router()
const redis = require('redis')
var async = require("async")

const client = redis.createClient({
    host: 'localhost',
    port: 6379
})

// obtener todos datos de una ciudad
route.get('/', async (req, res) => {
    let result = await User.find({ city: req.query.city }, { '_id': 0, '__v': 0 })
    res.send(result)
});

// agregar datos. 
// body format {name : "", city:"", image_path:"" }
route.post('/', async (req, res) => {
    try {
        let userModel = new User(req.body)
        await userModel.save()
        let key = req.body.city;
        client.get(key, (err, data) => {
            if (err) throw err
            client.set(key, data === null ? 1 : parseInt(data) + 1)
        });
        res.sendStatus(200)
    } catch { res.sendStatus(500) }
});

// caché
route.get('/last', (req, res) => {
    client.keys('*', (err, keys) => {
        async.map(keys, (key, cb) => {
            client.get(key, (error, value) => cb(null, { city: key, cases: parseInt(value) }));
        }, (error, results) => {
            if (error) res.sendStatus(500)
            res.json(results);
        });
    });
});

module.exports = route