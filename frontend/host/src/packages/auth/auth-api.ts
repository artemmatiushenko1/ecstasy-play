import { HttpClient } from '@/libs/packages/http/http.package.js';
import { SignInRequest, SignUpResponse } from './libs/types/types.js';
import { User } from '../users/users.package.js';

class AuthApi {
  constructor(private httpClient: HttpClient) {}

  signIn = (data: SignInRequest) =>
    this.httpClient.request<SignUpResponse>({
      url: '/auth/signin',
      data,
      method: 'POST',
      isAuth: false,
    });

  signUp = (data: SignInRequest) =>
    this.httpClient.request<SignUpResponse>({
      url: '/auth/signup',
      data,
      method: 'POST',
      isAuth: false,
    });

  getProfile = () =>
    this.httpClient.request<User>({ url: '/auth/profile', method: 'GET' });
}

export { AuthApi };
