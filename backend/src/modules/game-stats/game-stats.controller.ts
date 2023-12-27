import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GameStatsService } from './game-stats.service';
import { GameStatsEntity } from './game-stats.entity';
import { IdDto } from 'src/common/dto';
import { CreateGameStatsDto, FindAllGameStatsDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '../auth/guards';
import { User } from 'src/common/decorators';
import { JwtPayloadUser } from '../auth/types';

@ApiTags('game-stats')
@Controller('game-stats')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class GameStatsController {
  constructor(private readonly gameStatsService: GameStatsService) {}

  @Get()
  findAll(
    @Query() findAllGameStatsDto: FindAllGameStatsDto,
  ): Promise<GameStatsEntity[]> {
    const { gameId } = findAllGameStatsDto;
    return this.gameStatsService.findAll({
      ...findAllGameStatsDto,
      where: { game: { id: gameId } },
      relations: { game: true, user: true },
      order: { score: 'DESC', time: 'ASC' },
    });
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<GameStatsEntity> {
    return this.gameStatsService.findOne(conditions, {
      relations: { game: true, user: true },
    });
  }

  @Post()
  createOne(
    @Body() createEntityDto: CreateGameStatsDto,
    @User() user: JwtPayloadUser,
  ): Promise<GameStatsEntity> {
    const model = plainToInstance(GameStatsEntity, {
      ...createEntityDto,
      user: { id: user.id },
    });

    return this.gameStatsService.createOne(model);
  }
}
