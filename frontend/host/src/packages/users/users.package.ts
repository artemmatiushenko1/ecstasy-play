import { httpRequest } from '@/libs/packages/http/http.package.js';
import { UsersApi } from './users-api.js';

const usersApi = new UsersApi(httpRequest);

export { type User } from './libs/types/types.js';
export { usersApi };
