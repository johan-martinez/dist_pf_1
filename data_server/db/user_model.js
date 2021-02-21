const mongoose = require('mongoose')

const user = mongoose.Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    image_path: {
        type: String
    }
});

module.exports = User = mongoose.model('user', user)