import { Notification } from "../model/notification.js";
import {sendEmail} from "../utils/mailter.js";

export const sendNotification = async (req, res) => {
    try {
        const notifications = await Notification.find({ status: "UNSENT" });
        console.log(`Found ${notifications.length} notifications to send`);
        for (const notification of notifications) {
            sendEmail(notification.to, "Product Return", notification.message);
            notification.status = "SENT";
            await notification.save();
            console.log(`Notification sent to ${notification.to}`);
        }
        console.log("All notifications sent successfully");
        res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};