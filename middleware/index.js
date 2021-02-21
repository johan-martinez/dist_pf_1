const express = require('express')


var app = express()
var port = 3000






app.listen(port, ()=>{
    console.log(`iddleware is running on port ${port}`)
});