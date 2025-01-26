import { Notification } from "../model/notification.js";
import {sendEmail} from "../utils/mailter.js";
import dayjs from "dayjs";

export const sendNotification = async (req, res) => {
    try {
        const today = dayjs().startOf('day'); // Start of today
        const startOfTomorrow = today.add(1, 'day').startOf('day').toDate();
        const endOfTomorrow = today.add(1, 'day').endOf('day').toDate();

        const notifications = await Notification.find({
            status: "UNSENT",
            date: { $gte: startOfTomorrow, $lte: endOfTomorrow }
        });
        console.log(`Found ${notifications.length} notifications to send`);
        await Promise.all(notifications.map(async (notification) => {
            await sendEmail(notification.to, "Product Return", notification.message);
            notification.status = "SENT";
            await notification.save();
            console.log(`Notification sent to ${notification.to}`);
        }));
        console.log("All notifications sent successfully");
        res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};