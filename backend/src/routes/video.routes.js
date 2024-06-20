import { Router } from "express";
import { verifyJWT } from "../middlerware/auth.middleware.js";
import { upload } from "../middlerware/multer.middleware.js";
import { uploadVideo } from "../controller/video.controller.js";

const router  = Router()
router.use(verifyJWT)

router.route("/uploadVideo").post(
    upload.fields([
        {
           name : "videoFile",
           maxCount : 1
        },
        {
            name : "thumbnail",
            maxCount : 1
        }
    ]) , uploadVideo

)


export default router

