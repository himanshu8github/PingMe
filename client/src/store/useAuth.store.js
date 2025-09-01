import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5200"
    : "https://pingme-k7l6.onrender.com";


export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/auth/check", {
           headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      localStorage.setItem("token", res.data.token); // update token 
    set({ authUser: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //function to create a new account
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
     const res = await axiosInstance.post("/auth/signup", data, {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.token);
      set({ authUser: res.data.user });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
       const res = await axiosInstance.post("/auth/login", data, {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.token);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
        await axiosInstance.post("/auth/logout", {}, {
           withCredentials: true
           });
           localStorage.removeItem("token");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
      set({ socket: null });

    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data, {
      withCredentials: true,
    });
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
        auth: { token: localStorage.getItem("token") },
      query: {
        userId: authUser._id
         
      } ,
      withCredentials: true,
    });

    set({ socket });

    socket.off("getOnlineUsers");
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

}));