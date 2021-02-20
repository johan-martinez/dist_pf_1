const multer = require('multer')
const path = require('path')

const config=multer({
    fileFilter:(req,file,cb)=>{
        const filetypes=/jpeg|jpg|png/
        const ext=file.mimetype.split('/')
        if (filetypes.test(ext[ext.length-1])) 
            cb(null,true)
        else
            cb(`Por favor suba un archivo con cualquiera de estos tipos: ${filetypes}`)
    },
    storage:multer.diskStorage({
        destination: path.join(__dirname,'./img'),
        filename:(req,file,cb)=>{
            cb(null,file.originalname)
        }
    })
})

module.exports = config