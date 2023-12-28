import { HttpClientRequestConfig } from '../types/http-client-request-config.js';

interface IHttpClient {
  baseUrl: string;
  request<T>(config: HttpClientRequestConfig): Promise<T>;
}

export { type IHttpClient };
