import { PartialType } from '@nestjs/swagger';
import { CreateGameStatsDto } from './create-game-stats.dto';

export class UpdateGameStatsDto extends PartialType(CreateGameStatsDto) {}
