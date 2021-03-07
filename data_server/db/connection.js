const mongoose = require('mongoose');

const uri = "mongodb+srv://dist:dist1@cluster0.xixzg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(uri, { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    });
}

module.exports = connectDB;