import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  email: null,
  token: null,

  setUser: (user) => set({ user }),

  setEmail: (email) => set({ email }),

  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, email: null });
  },
}));

export default useAuthStore;
