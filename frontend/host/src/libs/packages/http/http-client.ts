import { useAuthStore } from '@/stores/auth/auth.js';
import {
  HttpClientRequestConfig,
  IHttpClient,
} from './libs/interfaces/interfaces.js';
import { useProfileStore } from '@/stores/profile/profile.js';

type HttpClientArgs = {
  baseUrl: string;
};

class HttpClient implements IHttpClient {
  baseUrl: string;

  constructor({ baseUrl }: HttpClientArgs) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeader() {
    const tokenType = 'Bearer';
    const token = useAuthStore.getState().accessToken;
    return { Authorization: `${tokenType} ${token}` };
  }

  async request<T>({
    url,
    method,
    data,
    isAuth = true,
  }: HttpClientRequestConfig) {
    let requestConfig: RequestInit = { method };

    if (data) {
      requestConfig = { ...requestConfig, body: JSON.stringify(data) };
    }

    let headers = { 'Content-Type': 'application/json' };

    if (isAuth) {
      headers = { ...headers, ...this.getAuthHeader() };
    }

    requestConfig = {
      ...requestConfig,
      headers,
    };

    const requestUrl = this.baseUrl + url;

    const req = await fetch(requestUrl, requestConfig);
    const res = await req.json();

    if (res.statusCode === 401) {
      useAuthStore.setState({ accessToken: null });
      useProfileStore.setState({ user: null });
    }

    return res as Promise<T>;
  }
}

export { HttpClient };
