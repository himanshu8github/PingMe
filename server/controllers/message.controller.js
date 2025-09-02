import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

//  Get all users for sidebar (excluding logged-in user)
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Get chat messages between logged-in user and another user
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Send message (with optional image + real-time socket emission)
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Create message object
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //  Real-time socket.io notification 
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // also emit to sender (so sender sees instantly)
    // const senderSocketId = getReceiverSocketId(senderId);
    // if (senderSocketId) {
    //   io.to(senderSocketId).emit("newMessage", newMessage);
    // }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
