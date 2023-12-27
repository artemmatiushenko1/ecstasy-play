import { HttpRequest } from '@/libs/packages/http/http.package.js';
import { User } from './libs/types/types.js';

class UsersApi {
  constructor(private httpRequest: HttpRequest) {}

  getUser = (id: string) => this.httpRequest.get<User>(`/users/${id}`, true);
}

export { UsersApi };
