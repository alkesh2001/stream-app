import { Router } from "express";
import { verifyJWT } from "../middlerware/auth.middleware.js";
import { getStreamkey } from "../controller/stream.controller.js";

const router = Router()


router.route('/streamkey').get(verifyJWT,getStreamkey)

export default router