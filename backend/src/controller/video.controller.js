import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadVideo = asyncHandler(async(req, res)=>{
    console.log("UploadVideo function called");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    const {title , description } = req.body

    if(!title && !description){
        console.log("title or description not rec")
        return res.status(400).json({message : "title or description are required"})
    }
   
    const videoLocalPath = req.files?.videoFile[0].path
    
    console.log(videoLocalPath , 'video local path undefined')

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path
    console.log(thumbnailLocalPath , 'thumbnailLocalPath undefined')


    if(!videoLocalPath){
        return res.status(400).json({message : "video file is required"})
    }

    if(!thumbnailLocalPath){
        return res.status(40).json({message : "thumbnail file is required"})
    }


    const video = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    console.log(video)

    if(!video){
        return res.status(400).json({message : "video file is required"})
    }

    if(!thumbnail){
        return res.status(400).json({message : "thumbnail file is required"})
    }

    const user = req.user 
    console.log(user)

    const videofile =   await Video.create({
        title ,
        description ,
        videoFile : video.url,
        thumbnail : thumbnail.url,
        duration : video.duration ,
        owner : user._id
    })

    return res.status(201).json({  videofile , message : "video upload successfully"})

})


export {
    uploadVideo
}