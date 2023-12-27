import {
  HttpClientRequestConfig,
  IHttpClient,
} from './libs/interfaces/interfaces.js';

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
    const token = window.localStorage.getItem('accessToken');
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

    if (isAuth) {
      requestConfig = {
        ...requestConfig,
        headers: { ...this.getAuthHeader() },
      };
    }

    try {
      const requestUrl = this.baseUrl + url;

      const req = await fetch(requestUrl, requestConfig);
      const res = await req.json();

      return res as Promise<T>;
    } catch (err) {
      console.log({ err });
    }

    return null;
  }
}

export { HttpClient };
