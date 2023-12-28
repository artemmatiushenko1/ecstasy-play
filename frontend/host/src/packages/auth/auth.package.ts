import { httpClient } from '@/libs/packages/http/http.package.js';
import { AuthApi } from './auth-api.js';

const authApi = new AuthApi(httpClient);

export { authApi };
