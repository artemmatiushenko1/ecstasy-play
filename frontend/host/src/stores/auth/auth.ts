import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;

  setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,

  setAccessToken: (accessToken: string) => {
    set({ accessToken });

    window.localStorage.setItem('token', accessToken);
  },
}));

export { useAuthStore };
