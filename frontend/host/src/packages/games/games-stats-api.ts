import { PostGamesStatsRequest } from './libs/types/types.js';
import { GameStatsEntry } from './libs/types/types.js';
import { HttpClient } from '@/libs/packages/http/http-client.js';

class GamesStatsApi {
  constructor(private httpClient: HttpClient) {}

  post = (data: PostGamesStatsRequest) =>
    this.httpClient.request({ url: '/game-stats', method: 'POST', data });

  getAll = (gameId?: string) => {
    return this.httpClient.request<GameStatsEntry[]>({
      url: '/game-stats',
      method: 'GET',
      query: {
        gameId,
      },
    });
  };
}

export { GamesStatsApi };
