import express from "express";
import { sendNotification } from "../controller/notification.js";
import {verifyJwt} from "../middlewares/verifyJwt.js";
const router = express.Router();

router.get("/send", verifyJwt, sendNotification);

export default router;