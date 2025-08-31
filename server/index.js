
import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';


import cloudinary from './lib/cloudinary.js'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { app, server } from "./lib/socket.js";
import { connectDB } from './lib/db.js';


// console.log("Cloudinary config in controller:", cloudinary.config());

// const app = express();



const PORT = process.env.PORT;
 

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 
      'https://pingmechatapp.onrender.com'],
    credentials: true,
}))

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})