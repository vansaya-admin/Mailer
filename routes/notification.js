import express from "express";
import { sendNotification } from "../controller/notification.js";
const router = express.Router();

router.get("/send", sendNotification);

export default router;