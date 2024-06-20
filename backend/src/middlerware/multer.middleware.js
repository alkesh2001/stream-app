
import multer from "multer"

const storage = multer.diskStorage({
    destination : function(req , file , cb)  {
        cb(null , "./public/temp" )
    },
    fillname : function(req,file , cb){
        cb(null , file.originalname)
    }
})

export const upload = multer({
    storage,
    limits: { fileSize: 100000000 }, 
})
 