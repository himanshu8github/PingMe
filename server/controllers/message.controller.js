import User from "../models/user.model";
import Message from '../models/message.model'

export const getUsersForSidebar = async (req, res) => {


    try{
        const loggedInUserId = req.user_id;
        const filteredUsers =  await User.find({_id:{$ne : loggedInUserId}}).select("-password"); 

        res.status(200).json(filteredUsers);
    }catch(error){
        console.log('Error in message Controller :' , error.message);
       return res.status(500).json({message: "Internal Server Error"})
    }
    
}

export const getMessages =  async (req, res) => {

    try {
        const {id:userToChatId} =  req.params;
        const myId = req.user._Id;

        const messages = await Message.find({
            $or :[
                 {senderId : myId, recieverId: userToChatId},
                {senderId: userToChatId, recieverId:myId}
            ]
        });

        res.status(200).json(messages);

        
    } catch (error) {
         console.log("Error in get messages controller :" , error.message);
         return res.status(500).json({message: "Internal Server Error"});
    }
}

export const sendMessage =  async (req, res) =>{

    try {
        const {text, image} = req.body;
        const {id : recieverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            // upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        };

        //create msg
        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl,
        });

        // msg save to db
        await newMessage.save();
        res.status(201).json(newMessage);

        
    } catch (error) {
        console.log("Error in send message controller: ", error.message);
        return res.status(500).json({message : "Internal server error"});
    }
}