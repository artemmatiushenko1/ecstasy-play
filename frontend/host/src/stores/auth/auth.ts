import { DataStatus } from '@/libs/enums/enums.js';
import { ValueOf } from '@/libs/types/types.js';
import { authApi } from '@/packages/auth/auth.package.js';
import {
  SignInRequest,
  SignUpRequest,
} from '@/packages/auth/libs/types/types.js';
import { create } from 'zustand';

interface AuthState {
  user: { firstName: string; lastName: string; email: string };
  signInStatus: ValueOf<typeof DataStatus>;
  signIn: (request: SignInRequest) => Promise<void>;
  signUp: (request: SignUpRequest) => Promise<void>;
}

const useAuthStore = create<AuthState>()((set) => ({
  user: { firstName: 'Jane', lastName: 'Doe', email: 'zoey@example.com' },
  signInStatus: DataStatus.IDLE,

  signIn: async (request) => {
    set({ signInStatus: DataStatus.PENDING });
    await authApi.signIn(request);
    set({ signInStatus: DataStatus.FULFILLED });
  },
  signUp: async (request) => {
    const response = await authApi.signUp(request);
    console.log({ response });
  },
}));

export { useAuthStore };
