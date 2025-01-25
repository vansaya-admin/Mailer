import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
    message: {
        type: String
    },
    type: {
        type: String
    },
    status: {
        type: String
    },
    date: {
        type: Date
    },
    to:{
        type: String
    }
})
export const Notification = mongoose.model("Notification", notificationSchema);