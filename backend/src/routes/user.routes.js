import { Router } from "express";
import { getCurrentUser, getUserChannelProfile, getUserHistroy, loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middlerware/auth.middleware.js";

const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secure route 

router.route("/logout").post(verifyJWT , logoutUser )
router.route('/getCurrentUser').get(verifyJWT , getCurrentUser)
router.route("/c/:username").get(verifyJWT , getUserChannelProfile)
router.route("/history").get(verifyJWT , getUserHistroy)
export default router