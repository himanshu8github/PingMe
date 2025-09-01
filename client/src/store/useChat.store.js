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

  // Get all users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users", {
        withCredentials: true, // sends cookie
      });
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Get messages with selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`, {
        withCredentials: true,
      });
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const { authUser, socket } = useAuthStore.getState();
    try {
      await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData, {
        withCredentials: true,
      });

      // Emit to socket for real-time
      if (socket?.connected) {
        socket.emit("sendMessage", {
          senderId: authUser._id,
          receiverId: selectedUser._id,
          text: messageData.text,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  // Subscribe to new messages via socket
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
    socket?.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
