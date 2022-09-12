const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'pictures/lessons/')
    },
    filename: function (req, file, cb) {
        // const filename = file.originalname
        const lenOfPictureNameArray = file.originalname.split('.').length
        const imageFormat = file.originalname.split('.')[lenOfPictureNameArray - 1]
        cb(null, Date.now() + '.' + imageFormat) //Appending .jpg
        // cb(null, filename) //Appending .jpg
    }
})
exports.upload = multer({
    storage: storage
    // limits:{
    //     fieldSize: 1000000
    // },
    // fileFilter(req,data,cb){
    //     if (!data.originalname.match(/\.(jpeg|jpg|png)$/)){
    //         return cb(new Error('File must be image!'))
    //     }
    //     cb(undefined,true)
    // }
})
