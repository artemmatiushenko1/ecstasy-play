import { HttpClient } from './http-client.js';

const httpClient = new HttpClient({ baseUrl: import.meta.env.VITE_API_URL });

export { httpClient, HttpClient };
