import { Router } from "express";
import { toggleSubscription } from "../controller/subscription.controller.js";
import { verifyJWT } from "../middlerware/auth.middleware.js";

const router = Router()


router.route("/c/:channelId").post(verifyJWT , toggleSubscription)


export default router