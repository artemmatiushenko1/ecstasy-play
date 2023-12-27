import { User } from '@/packages/users/users.package.js';
import { create } from 'zustand';

interface ProfileState {
  user: User | null;

  setUser: (user: User) => void;
}

const useProfileStore = create<ProfileState>()((set) => ({
  user: null,

  setUser: (user: User) => {
    set({ user });
  },
}));

export { useProfileStore };
