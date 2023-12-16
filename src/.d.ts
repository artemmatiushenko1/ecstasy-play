declare module 'connectTiles/app' {
  import { GameAppEventService } from '@/packages/games/games.package.js';

  const TilesBoard: React.FC<{
    gameAppEventService: typeof GameAppEventService;
  }>;

  export default TilesBoard;
}

declare module 'snake/app' {
  import { GameAppEventService } from '@/packages/games/games.package.js';

  const unmount: () => void;
  const mount: (
    root: HTMLDivElement,
    gameAppEventService: typeof GameAppEventService,
  ) => typeof unmount;

  export default mount;
}
