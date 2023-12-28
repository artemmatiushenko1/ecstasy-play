import { HttpRequest } from '@/libs/packages/http/http.package.js';
import { PostGamesStatsRequest } from './libs/types/post-games-stats-request';
import { Game } from './libs/types/types.js';
import { User } from '../users/users.package.js';

class GamesStatsApi {
  constructor(private httpRequest: HttpRequest) {}

  post = (data: PostGamesStatsRequest) =>
    this.httpRequest.post('/game-stats', data);

  getAll = (gameId?: string) => {
    const url = gameId ? `/game-stats?gameId=${gameId}` : '/game-stats';

    return this.httpRequest.get<
      {
        id: string;
        score: number;
        game: Game;
        user: User;
        createdAt: string;
        time: number;
      }[]
    >(url);
  };
}

export { GamesStatsApi };
