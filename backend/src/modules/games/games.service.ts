import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services';
import { Repository } from 'typeorm';
import { gamesServiceErrorMessages } from './games.constants';
import { GameEntity } from './game.entity';

@Injectable()
export class GamesService extends BaseService<GameEntity> {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameEntityRepository: Repository<GameEntity>,
  ) {
    super(gameEntityRepository, gamesServiceErrorMessages);
  }
}
