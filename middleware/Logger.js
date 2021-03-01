const {createLogger,format, transports} = require('winston')
const path = require('path')

module.exports =createLogger({
    transports:[
        new transports.File({
            level:"error",
            filename:path.join(__dirname,"logs/error.log"),
            format:format.combine(format.simple(),format.timestamp(),format.printf(info=>`[${info.level.toUpperCase()}](${info.timestamp}): ${info.message}`))
        })
    ]
})