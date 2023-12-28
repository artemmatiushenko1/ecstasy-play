import { httpClient } from '@/libs/packages/http/http.package.js';
import { GamesApi } from './games-api.js';
import { GamesStatsApi } from './games-stats-api.js';

const gamesApi = new GamesApi(httpClient);
const gamesStatsApi = new GamesStatsApi(httpClient);

export { GameApp, GameAppEvent } from './libs/enums/enums.js';
export { GameAppEventService } from './libs/services/services.js';
export { gamesApi, gamesStatsApi };
