import mongoose , {Schema} from "mongoose";

const streamKeySchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId ,
        ref : "User"
    } ,
    streamKey : {
        type : String ,
    }

},{timestamps : true})


export const Streamkey = mongoose.model("Streamkey" , streamKeySchema)