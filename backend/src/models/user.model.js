import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username : {
        type : String ,
        required : true ,
        unique : true ,
        lowercase : true 
    } ,

    fullname : {
        type : String ,
        required : true ,
        lowercase : true ,
        unique : true
    } ,
    email : {
        type : String ,
        required :true ,
        lowercase : true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    }

} , {timestamps : true})


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id : this._id,
            username : this.username ,
            fullname : this.fullname,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User' , userSchema)