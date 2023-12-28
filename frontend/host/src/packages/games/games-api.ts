import { Game } from './libs/types/types.js';
import { HttpClient } from '@/libs/packages/http/http.package.js';

class GamesApi {
  constructor(private httpClient: HttpClient) {}

  getAllGames = () =>
    this.httpClient.request<Game[]>({ url: '/games', method: 'GET' });
}

export { GamesApi };
