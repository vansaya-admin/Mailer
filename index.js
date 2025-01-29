import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import notificationRoutes from './routes/notification.js';
import { connectDB } from './config/database.js';
import cookieParser from 'cookie-parser';

const app = express();
connectDB();

app.use(cors());
app.use(cookieParser());

app.use('/api/v1/notification', notificationRoutes);

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});