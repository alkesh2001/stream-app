import mongoose from "mongoose"

const DB_NAME = 'stream-app';

const connectDB = async () =>{
   try {
     const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
     console.log(`\n mongo DB connected  !! db host : ${connection.connection.host} `  )
   } catch (error) {
      console.log("erroe when database connect " , error)
      process.exit(1)
   }
}

export default connectDB