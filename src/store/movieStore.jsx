import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { BASE_URL } from "../utils/constants";

const useMovieStore = create((set, get) => ({
  isLoading: false,
  key: "movie",
  category: "popular", // default if you want

  setKey: (data) => set({ key: data }),
  setCategory: (data) => set({ category: data }),

  getVideos: async () => {
    set({ isLoading: true });
    const key = get().key;       // e.g. 'movie'
    const category = get().category; // e.g. 'popular'
    try {
      const response = await axios.get(`${BASE_URL}/get-vedios/${key}/${category}`);
      set({ isLoading: false });
      return { success: true, movie: response.data.data };
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      set({ isLoading: false });
      return { success: false };
    }
  },

  getTrendingVideo: async () => {
    set({ isLoading: true });
    const key = get().key;  // e.g. 'movie'
    try {
      const response = await axios.get(`${BASE_URL}/videos/get-TrendingVedios/${key}`);
      set({ isLoading: false });
      return { success: true, movie: response.data.data };
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      set({ isLoading: false });
      return { success: false };
    }
  },
}));

export default useMovieStore;
