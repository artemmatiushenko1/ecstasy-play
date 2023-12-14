declare module 'connectTiles/app' {
  const TilesBoard: React.FC;

  export default TilesBoard;
}

declare module 'snake/app' {
  const unmount: () => void;
  const mount: (root: HTMLDivElement) => typeof unmount;

  export default mount;
}
