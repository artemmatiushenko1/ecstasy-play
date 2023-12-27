import { HttpClient } from './http-client.js';
import { HttpRequest } from './http-request.js';

const httpClient = new HttpClient({ baseUrl: import.meta.env.BASE_URL });
const httpRequest = new HttpRequest(httpClient);

export { httpRequest, httpClient, HttpRequest };
