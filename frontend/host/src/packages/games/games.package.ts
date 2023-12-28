import { httpRequest } from '@/libs/packages/http/http.package.js';
import { GamesApi } from './games-api.js';
import { GamesStatsApi } from './games-stats-api.js';

const gamesApi = new GamesApi(httpRequest);
const gamesStatsApi = new GamesStatsApi(httpRequest);

export { GameApp, GameAppEvent } from './libs/enums/enums.js';
export { GameAppEventService } from './libs/services/services.js';
export { gamesApi, gamesStatsApi };
