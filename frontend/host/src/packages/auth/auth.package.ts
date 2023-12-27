import { httpRequest } from '@/libs/packages/http/http.package.js';
import { AuthApi } from './auth-api.js';

const authApi = new AuthApi(httpRequest);

export { authApi };
