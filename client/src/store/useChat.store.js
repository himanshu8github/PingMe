import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuth.store";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
      const { authUser, socket } = useAuthStore.getState();
      
    try {
      await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      
        // Emit realtime
        if (socket?.connected) {
    socket.emit("sendMessage", {
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
    });
  }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;


  const { authUser, socket } = useAuthStore.getState();
  

    socket.off("newMessage"); 
    socket.on("newMessage", (newMessage) => {
      const isFromSelectedUser = newMessage.senderId === selectedUser._id;
    const isMyMessage = newMessage.senderId === authUser._id;

    if (!isFromSelectedUser && !isMyMessage) return;

 set((state) => ({ messages: [...state.messages, newMessage] }));
  });
    
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));