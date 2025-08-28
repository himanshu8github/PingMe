import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
 
  isSigningUp : false,
  isLoggingIng: false,
  isUpdatingProfile: false, 

   isCheckingAuth: true,

   checkAuth: async () => {

    try{
        const res = await axiosInstance.get("/auth/check");
        set({authUser:res.data});

    }catch(error){
        console.log("Error in UseAuthStore", error.message);
        set({authUser:null});

    }finally{
        set({isCheckingAuth: false});
    }
   }


//   setAuthUser: (user) => set({ authUser: user }),
//   setIsCheckingAuth: (value) => set({ isCheckingAuth: value }),
}));
