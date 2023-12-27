import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import { Repository } from 'typeorm';
import { tracksServiceErrorMessages } from './game-stats.constants';
import { GameStatsEntity } from './game-stats.entity';

@Injectable()
export class GameStatsService extends BaseService<GameStatsEntity> {
  constructor(
    @InjectRepository(GameStatsEntity)
    private readonly gameStatsEntityEntityRepository: Repository<GameStatsEntity>,
  ) {
    super(gameStatsEntityEntityRepository, tracksServiceErrorMessages);
  }
}
