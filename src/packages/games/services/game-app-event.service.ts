import { ValueOf } from '@/libs/types/types.js';
import { GameAppEvent } from '../enums/enums.js';

const GameAppEventService = {
  GameAppEvent,
  fire: (event: ValueOf<typeof GameAppEvent>, body?: CustomEventInit): void => {
    const customEvent = new CustomEvent(event, body);
    window.dispatchEvent(customEvent);
  },
  subscribe: (event: ValueOf<typeof GameAppEvent>, listener: EventListener) => {
    window.addEventListener(event, listener);
  },
  unsubscribe: (
    event: ValueOf<typeof GameAppEvent>,
    listener: EventListener,
  ) => {
    window.removeEventListener(event, listener);
  },
};

export { GameAppEventService };
