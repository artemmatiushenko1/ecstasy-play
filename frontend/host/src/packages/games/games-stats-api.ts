import { HttpRequest } from '@/libs/packages/http/http.package.js';
import { PostGamesStatsRequest } from './libs/types/post-games-stats-request';

class GamesStatsApi {
  constructor(private httpRequest: HttpRequest) {}

  post = (data: PostGamesStatsRequest) =>
    this.httpRequest.post('/game-stats', data);
}

export { GamesStatsApi };
