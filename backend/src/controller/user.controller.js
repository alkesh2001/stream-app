import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
      // return  new error(error , "error when user generate token")
    }

}

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

      const {accessToken} = await generateToken(user._id)
      console.log(accessToken)


      return res.status(200).json({user , accessToken ,message : "register user successfully"})

})

const loginUser = asyncHandler(async (req , res) =>{
   
  const {email , password} = req.body

  console.log(email , password)
  
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

export {
    registerUser,
    loginUser ,
    logoutUser
}