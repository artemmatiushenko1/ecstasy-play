import { useAuthStore } from '@/stores/auth/auth.js';
import { IHttpClient } from './libs/interfaces/interfaces.js';
import { useProfileStore } from '@/stores/profile/profile.js';
import { HttpClientRequestConfig } from './libs/types/types.js';

type HttpClientConstructor = {
  baseUrl: string;
};

class HttpClient implements IHttpClient {
  baseUrl: string;

  constructor({ baseUrl }: HttpClientConstructor) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeader() {
    const tokenType = 'Bearer';
    const token = useAuthStore.getState().accessToken;

    return { Authorization: `${tokenType} ${token}` };
  }

  private buildUrl(path: string, query?: Record<string, unknown>) {
    const url = new URL(path || '/', `https://${window.location.host}`);

    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    }

    return url.pathname + url.search;
  }

  async request<T>({
    url,
    method,
    data,
    isAuth = true,
    query,
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

    const req = await fetch(
      this.buildUrl(this.baseUrl + url, query),
      requestConfig,
    );

    const res = await req.json();

    if (res.statusCode === 401) {
      useAuthStore.setState({ accessToken: null });
      useProfileStore.setState({ user: null });
    }

    if (!req.ok) {
      throw res;
    }

    return res as Promise<T>;
  }
}

export { HttpClient };
