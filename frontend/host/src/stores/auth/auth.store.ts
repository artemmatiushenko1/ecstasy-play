import { create } from 'zustand';

interface AuthState {
  user: { firstName: string; lastName: string; email: string };
}

const useAuthStore = create<AuthState>()(() => ({
  user: { firstName: 'Jane', lastName: 'Doe', email: 'zoey@example.com' },
}));

export { useAuthStore };
