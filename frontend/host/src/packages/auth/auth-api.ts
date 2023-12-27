import { HttpRequest } from '@/libs/packages/http/http.package.js';
import { SignInRequest } from './libs/types/types.js';

class AuthApi {
  constructor(private httpRequest: HttpRequest) {}

  signIn = (request: SignInRequest) =>
    this.httpRequest.post('/sign-in', request, false);

  signUp = (request: SignInRequest) =>
    this.httpRequest.post('/sign-up', request, false);
}

export { AuthApi };
