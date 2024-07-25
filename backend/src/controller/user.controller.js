import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { json } from "express";
import { Streamkey } from "../models/streamkey.model.js";

const generateToken = async (userId) =>{
    try {
        if(!userId){
            throw new error(error , "userid not found for generate token")
        }
        const user = await User.findById(userId)

        if(!user){
            throw new error(error , "user not found")
        }

        const accessToken = user.generateAccessToken()

        await user.save({validateBeforeSave : true})

        return {accessToken}

    } catch (error) {
      console.log(error , 'error when generate acccess token')
    }
}


const generateStreamKey = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const registerUser = asyncHandler(async (req ,res )=>{
      const {username , fullname , email , password} = req.body
      
      if([username , fullname , email , password].some((field)=> field?.trim() === "" )){
        return res.status(400).json({message : "all field are required"})
      }

      const exitedUser = await User.findOne({
        $or : [{email},{username}]
      })

      if(exitedUser){
        return res.status(409).json({message : "username and email are already exited"})
      }

      const user = await User.create({
        fullname,
        username,
        email,
        password
      })

      const userId = user._id
      const streamKey = generateStreamKey(10)

      await Streamkey.create({
          owner : userId,
          streamKey : streamKey
      })

      const {accessToken} = await generateToken(user._id)
      // console.log(accessToken)


      return res.status(200).json({user , accessToken ,message : "register user successfully"})

})

const loginUser = asyncHandler(async (req , res) =>{
   
  const {email , password} = req.body

  // console.log(email , password)
  
  if(!email){
    return res.status(404).json({message :"email is required "})
  }

  const user = await User.findOne({email})

  if(!user){
    return res.status(404).json({message : "user not found"})
  }

  if(user.password !== password){
    return res.status(401).json({message : "password is invalid end correct password"})
  }

  const {accessToken} = await generateToken(user._id)

  const loginedUser = await User.findById(user._id)

  const  optiones = {
    httpOnly : true ,
    secure : true
  }

  return res
        .status(201)
        .cookie("accessToken" , accessToken , optiones)
        .json({
          loginedUser,
          accessToken ,
          message : "login successfully"
        })

})

const logoutUser = asyncHandler(async (req , res)=>{
    await User.findByIdAndUpdate(req.user._id ,
      { 
          $or : {
                  accessToken : 1
                }
      },
      {
        new : true
      }
    )

    const  optiones = {
      httpOnly : true ,
      secure : true
    }

    return res 
          .status(200)
          .clearCookie("accessToken" , optiones)
          .json({message : "user logout successfully"})

})

const getCurrentUser = asyncHandler(async(req , res)=>{
    try {
      const user = req.user ;

      return res.status(201).json({user , message : 'Current user fetched successfully'})

    } catch (error) {
        return res.status(404).json({message : 'get user not found'})
    }
})


const getUserChannelProfile = asyncHandler(async(req , res)=>{
     
       const {username} = req.params

       if(!username?.trim()){
         return res.status(400).json({message : "username is missing"})
       }

      const channel = await User.aggregate([
          {
            $match : {
              username : username?.toLowerCase()
            }
          },
          {
            $lookup : {
              from : "subscriptions" ,
              localField : "_id",
              foreignField : "channel",
              as : "subscribers"
            }
          },
          {
            $lookup : {
              from : "subscriptions" ,
              localField : "_id",
              foreignField : "subscriber",
              as : "subscribedTo"
            }
          },
          {
            $addFields : {
              subscribersCount : {
                $size : "$subscribers"
              },
              channelSubscribedToCount :{
                $size : "$subscribedTo"
              },
              isSubscribed : {
                $cond : {
                  if : {$in : [req.user?._id , "$subscribers.subscriber"]},
                  then : true ,
                  else : false
                }
              }
            }
          },
          {
            $project : {
              fullName :1 ,
              username : 1 ,
              subscribersCount : 1 ,
              channelSubscribedToCount : 1 ,
              isSubscribed : 1 ,
              avatar : 1 ,
              coverImage : 1 ,
              email : 1
            }
          }
      ])
      if(!channel?.length){
        return res.status(404).json({message : "channel does not exist"})
      }
      // console.log(channel , "this data from channel")

     return res.status(200).json({ res : channel[0] , message : "user channel fatched successfully"})

})

const getUserHistroy = asyncHandler(async(req , res) =>{
    try {
      const user = await User.aggregate([
        {
          $match:{
            _id : new mongoose.Types.ObjectId(req.user._id)
          }
        },
        {
          $lookup :{
            from : 'videos' ,
            localField : "watchHistory" ,
            foreignField : "_id" ,
            as : "watchHistory",
            pipeline :[
              {
                $lookup :{
                  from : "users",
                  localField : "owner" ,
                  foreignField : "_id",
                  as : "owner",
                  pipeline :[
                    {
                      $project : {
                        fullname : 1 ,
                        username : 1
                      }
                    }
                  ]
                }
              },
              {
                $addFields :{
                  owner : {
                    $first : "$owner"
                  }
                }
              }
            ]
          }
        }
      ])
      // console.log('user watch history ' ,user[0].watchHistory  )
      return res.status(200).json({ res : user[0].watchHistory  , message : "watch History successfully get "})
    } catch (error) {
       return res.status(error?.status || 500).json({message :"error when i get watch history"})
    }
})

const getStreamkey = asyncHandler(async(req ,res)=>{
    const userId = new mongoose.Types.ObjectId(req.user._id)
    if(!userId){
        return res.status(401).json({message : "userId not found in getstreamkey in streamcontroller"})
    }

    const  streamKey = await Streamkey.findOne({userId})

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

export {
    registerUser,
    loginUser ,
    logoutUser ,
    getCurrentUser,
    getUserChannelProfile,
    getUserHistroy,
    getStreamkey
}