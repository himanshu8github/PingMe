import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuth.store";

export const useChatStore = create(
  persist(
    (set, get) => ({
      messages: {},        // store messages per userId
      users: [],
      selectedUser: null,
      isUsersLoading: false,
      isMessagesLoading: false,
      onlineUsers: [],

      // Get all users
      getUsers: async () => {
        set({ isUsersLoading: true });
        try {
          const res = await axiosInstance.get("/message/users", {
            withCredentials: true,
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
          set((state) => ({
            messages: { ...state.messages, [userId]: res.data },
          }));
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
          const res = await axiosInstance.post(
            `/message/send/${selectedUser._id}`,
            messageData,
            { withCredentials: true }
          );

          // Optimistically update messages
          set((state) => {
            const userMsgs = state.messages[selectedUser._id] || [];
            return {
              messages: {
                ...state.messages,
                [selectedUser._id]: [...userMsgs, res.data],
              },
            };
          });

          // Emit socket
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

      // Subscribe to socket messages
    subscribeToMessages: () => {
  const { selectedUser } = get();
  if (!selectedUser) return;

  const { authUser, socket } = useAuthStore.getState();
  if (!socket) return;

  // Remove previous listeners to avoid duplicates
  socket.off("newMessage");

  socket.on("newMessage", (newMessage) => {
    // Ignore if it's my own message (already added optimistically)
    if (newMessage.senderId === authUser._id) return;

    set((state) => {
      const userMsgs = state.messages[selectedUser._id] || [];
      return {
        messages: {
          ...state.messages,
          [selectedUser._id]: [...userMsgs, newMessage],
        },
      };
    });
  });
},


      unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
        socket.off("newMessage");
      },

      setSelectedUser: (selectedUser) => set({ selectedUser }),
      setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
    }),
    {
      name: "chat-store", //  persist key
        partialize: (state) => ({ selectedUser: state.selectedUser }),
      getStorage: () => localStorage, // save in localStorage
    }
  )
);
