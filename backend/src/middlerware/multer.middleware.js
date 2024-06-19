import multer from "multer"

const storage = multer.diskStorage({
    destination : function(req , file , cb)  {
        cd(null , "./public/temp" )
    },
    fillname : function(req,file , cb){
        cd(null , "./public/temp")
    }
})

export const upload = multer({
    storage
})