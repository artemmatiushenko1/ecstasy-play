import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;

  setAccessToken: (accessToken: string | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,

      setAccessToken: (accessToken: string | null) => {
        set({ accessToken });
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
);

export { useAuthStore };
