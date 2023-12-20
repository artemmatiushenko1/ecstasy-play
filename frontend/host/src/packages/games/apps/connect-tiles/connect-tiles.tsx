import TilesBoard from 'connectTiles/app';
import { GameAppEventService } from '../../games.package.js';

const ConnectTiles = () => {
  return <TilesBoard gameAppEventService={GameAppEventService} />;
};

export default ConnectTiles;
