import { Streamkey } from './models/streamkey.model.js'
import mongoose from 'mongoose'
import express from 'express'
import cors from "cors"
import cookieParse from "cookie-parser"
import { verifyJWT } from './middlerware/auth.middleware.js'
const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN ,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(cookieParse())

app.use(verifyJWT)
app.post("/auth", async function (req, res) {
  const userInputKey = req.query.key || req.body.key;
  const userId = new mongoose.Types.ObjectId(req.user._id)
  console.log(userId)

  if(!userId){
    return res.status(401).json({message : "userId not found in getstreamkey in streamcontroller"})
   }

   const  accountstreamKey = await Streamkey.findOne({owner : userId})
   const streamKey = accountstreamKey.streamKey;
   
   if(!streamKey){
     return res.status(404).json({message : "streamkey not found "})
    }
    console.log(userInputKey)

    if (userInputKey === streamKey) {
      return res.status(200).send();
     }
    /* Reject the stream */
    res.status(403).send();
});


import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import subscription from './routes/subscription.routes.js'
import streamRouter from './routes/streamkey.routes.js'

app.use('/api/v1/user' , userRouter)
app.use('/api/v1/videos' , videoRouter)
app.use('/api/v1/subscription' ,subscription )
app.use('/api/v1/stream' ,streamRouter )

export {app}