import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Streamkey } from "../models/streamkey.model.js";

const getStreamkey = asyncHandler(async(req ,res)=>{
    const userId = new mongoose.Types.ObjectId(req.user._id)
    if(!userId){
        return res.status(401).json({message : "userId not found in getstreamkey in streamcontroller"})
    }

    const  streamKey = await Streamkey.findOne({owner : userId})

    if(!streamKey){
        return res.status(404).json({message : "streamkey not found "})
    }

    return res
          .status(200)
          .json({
            streamKey : streamKey.streamKey ,
            message : "user stream get successfully and generate"
          })
})

// const verifyStreamkey = asyncHandler(async(req , res)=>{
//     const userId = new mongoose.Types.ObjectId(req.user._id)

//     const streamkey = await Streamkey.fin 
//  })
export {
    getStreamkey
}