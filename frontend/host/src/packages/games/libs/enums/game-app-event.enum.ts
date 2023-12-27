const GameAppEvent = {
  MOUNT: 'mount',
  UNMOUNT: 'unmount',
  SCORE_UPDATE: 'score_update',
  END: 'end',
  RESTART: 'restart',
} as const;

export { GameAppEvent };
