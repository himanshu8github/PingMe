
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




// const app = express();



const PORT = process.env.PORT;
 

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: [  'https://pingmechatapp.onrender.com',
      'http://localhost:5173' 
    ],
    credentials: true,
}))

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.use((err, req, res, next) => {
  console.error(" Error:", err.stack);
  res.status(500).json({ message: "Something broke!" });
});

server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  connectDB();
});
