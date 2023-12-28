import { User } from '@/packages/users/users.package.js';
import { Game } from './game.type.js';

type GameStatsEntry = {
  id: string;
  score: number;
  game: Game;
  user: User;
  createdAt: string;
  time: number;
};

export { type GameStatsEntry };
