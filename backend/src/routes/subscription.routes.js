import { Router } from "express";
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controller/subscription.controller.js";
import { verifyJWT } from "../middlerware/auth.middleware.js";

const router = Router()


router.route("/c/:channelId").post(verifyJWT , toggleSubscription)
router.route("/c/:channelId " ).get(verifyJWT , getUserChannelSubscribers)

router.route("/u/:subscriberId").get(verifyJWT , getSubscribedChannels)

export default router