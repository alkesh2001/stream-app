import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res)=>{

      const { channelId } = req.params 
      console.log(channelId , "get channelId form params")

      if(!channelId){
        return res.status(404).json({message : "channel not found"})
      }
      const user = await User.findById(req.user._id)
       
      console.log(user)

      if(!user){
        return res.status(404).json({message : "user not found"})
      }
      
console.log(user , "line 16")

if (!Array.isArray(user.subscription)) {
  user.subscription = [];
}

      const isSubscribed = user.subscription.includes(channelId);
      if(isSubscribed){
        user.subscription = user.subscription.filter(Id => Id !== channelId)
      }else{
        user.subscription.push(channelId)
      }

      console.log(isSubscribed , 'isSubscribed from line 22')

      await user.save()

      return res.status(200).json({isSubscribed : !isSubscribed , message : "Susbscrition toggle susccessfuly"})
})

const  getUserChannelSubscribers = asyncHandler(async (req ,res)=>{

})

const getSubscribedChannels = asyncHandler(async(req ,res)=>{

})

export {
    toggleSubscription ,
    getUserChannelSubscribers,
    getSubscribedChannels
}