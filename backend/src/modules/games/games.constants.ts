import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const gamesServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.GAMES_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.GAME_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};
