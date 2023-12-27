import { GamesApi } from './games-api.js';

const gamesHttpApi = new GamesApi();

export { GameApp, GameAppEvent } from './libs/enums/enums.js';
export { GameAppEventService } from './libs/services/services.js';
export { gamesHttpApi };
