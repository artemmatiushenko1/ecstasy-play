import { HttpRequest } from '@/libs/packages/http/http.package.js';
import { Game } from './libs/types/types.js';

class GamesApi {
  constructor(private httpRequest: HttpRequest) {}

  getAllGames = () => this.httpRequest.get<Game[]>('/games');
}

export { GamesApi };
