import express from 'express'
import cors from "cors"
import cookieParse from "cookie-parser"
const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN ,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(cookieParse())

import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import subscription from './routes/subscription.routes.js'

app.use('/api/v1/user' , userRouter)
app.use('/api/v1/videos' , videoRouter)
app.use('/api/v1/subscription' ,subscription )

export {app}