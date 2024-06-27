import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middlerware/auth.middleware.js";

const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secure route 

router.route("/logout").post(verifyJWT , logoutUser )
router.route('/getCurrentUser').get(verifyJWT , getCurrentUser)

export default router