import { HttpRequest } from '@/libs/packages/http/http.package.js';
import { SignInRequest, SignUpResponse } from './libs/types/types.js';
import { User } from '../users/users.package.js';

class AuthApi {
  constructor(private httpRequest: HttpRequest) {}

  signIn = (request: SignInRequest) =>
    this.httpRequest.post('/auth/signin', request, false);

  signUp = (request: SignInRequest) =>
    this.httpRequest.post<SignUpResponse>('/auth/signup', request, false);

  getProfile = () => this.httpRequest.get<User>('/auth/profile');
}

export { AuthApi };
