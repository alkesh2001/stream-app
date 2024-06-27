import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadVideo = asyncHandler(async(req, res)=>{

    const {title , description } = req.body

    if(!title && !description){
        return res.status(400).json({message : "title or description are required"})
    }
   
    const videoLocalPath = req.files?.videoFile[0].path

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path

    if(!videoLocalPath){
        return res.status(400).json({message : "video file is required"})
    }

    if(!thumbnailLocalPath){
        return res.status(40).json({message : "thumbnail file is required"})
    }

    const video = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if(!video){
        return res.status(400).json({message : "video file is required"})
    }

    if(!thumbnail){
        return res.status(400).json({message : "thumbnail file is required"})
    }

    const user = req.user 

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

const getAllVideos = asyncHandler(async(req, res) =>{

     const allvideo = await Video.find({})

     if(!allvideo){
        return res.status(400).json({message : 'get all video not found'})
     }

     return res.status(201).json({allvideo , message : "get all videos"})
})

export {
    uploadVideo ,
    getAllVideos
}