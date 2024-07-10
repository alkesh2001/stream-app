import mongoose, { mongo } from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res)=>{

      const { channelId } = req.params 

      if(!channelId){
        return res.status(400).json({message : "no found channel ID"})
      }

      const userId  = req.user._id
      if(!userId){
        return res.status(404).json({messagee  : "user not found when from middelware get user "})
      }
      
      let subscription = await Subscription.findOne({
        subscriber : userId ,
        channel : channelId
      })
      if(!subscription){
        subscription = await Subscription.create({
          subscriber : userId ,
          channel : channelId
        })
        return res.status(200).json({subscription , message : "user subscribed"})
      }else{
        const unsubscription = await Subscription.deleteOne({
           _id : subscription._id
        })

        return res.status(201).json({unsubscription , message : "user unsubscribed" })
      }
})

const  getUserChannelSubscribers = asyncHandler(async (req ,res)=>{
      const {channelId} = req.params 
      if(!channelId){
        return res.status(404).json({message : "subscribedId not found "})
      }

      try {
        const subscriberlist = await Subscription.aggregate([
          {
            $match : {
              channel : new mongoose.Types.ObjectId(channelId)
            }
          },
          {
            $lookup :{
              from : "channels",
              localField : "channel" ,
              foreignField : "_id",
              as : "subscribers"
            }
          },
          {
            $unwind : "$subscribers"
          },
          {
            $project : {
              _id : 0 ,
              channel : 1,
              subscriber : "$subscribers._id",
              username : "$subscribers.username",
              fullname : "$subscribers.fullname"
            }
          }
        ])

        return res.status(200).json({subscriberlist , message : "user subscriber list"})
      } catch (error) {
         return res.status(400).json({error , message : "error when getuserchannelsubscriber"})
      }
})

const getSubscribedChannels = asyncHandler(async(req ,res)=>{
    const {subscriberId} = req.params
    
    console.log(subscriberId)
    if(!subscriberId){
      return res.status(404).json({message : "subscriberId not found"})
    }
    try {
      const channelList = await Subscription.aggregate([
        {
          $match : {
            subscriber : new mongoose.Types.ObjectId(subscriberId)
          }
        },
        {
          $lookup :{
            from : "users",
            localField : "channel",
            foreignField : "_id",
            as : "channels"
          }
        },
        {
          $unwind : "$channels"
        },
        {
          $project :{
            subsciber :1,
            channelId : "$channels._id",
            channelName : "$channels.name",
            channelFullName : "$channels.fullname"
          }
        }
      ]);
      if(channelList.length === 0) throw res.status(404).json({message : "channel is empty"})
        return res.status(200).json({channelList , message : "get channel list successfully"})
    } catch (error) {
       return res.status(400).json({error , message : "error in get channel list"})
    }
})

export {
    toggleSubscription ,
    getUserChannelSubscribers,
    getSubscribedChannels
}