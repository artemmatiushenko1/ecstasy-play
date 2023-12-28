type HttpClientRequestConfig = {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  isAuth?: boolean;
  query?: Record<string, unknown>;
  headers?: Record<string, string>;
  data?: unknown;
};

export { type HttpClientRequestConfig };
