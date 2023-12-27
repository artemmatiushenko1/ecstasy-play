import { HttpClient } from './http-client.js';
import { HttpRequest } from './http-request.js';

const httpClient = new HttpClient({ baseUrl: import.meta.env.VITE_API_URL });
const httpRequest = new HttpRequest(httpClient);

export { httpRequest, httpClient, HttpRequest };
