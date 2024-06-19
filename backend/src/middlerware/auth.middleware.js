import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req , res , next )=>{
   try {
         const token = await req.cookies?.accessToken || req.header("authorization")?.replace("Bearer","")
         
         if(!token){
            return res.status(400).json({message : "token not found"})
         }

         const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)

         const user = await User.findById(decodedToken?.id)

         if(!user){
            return res 
                   .status(404)
                   .json({message : "user not found by decoded token"})
         }
         req.user = user;
         next()
   } catch (error) {
       console.log(error , "error when user auth by middleware")
   }
})