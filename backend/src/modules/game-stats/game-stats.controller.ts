import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GameStatsService } from './game-stats.service';
import { GameStatsEntity } from './game-stats.entity';
import { IdDto } from 'src/common/dto';
import { CreateGameStatsDto } from './dto';
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
  findAll(): Promise<GameStatsEntity[]> {
    return this.gameStatsService.findAll({
      relations: { game: true, user: true },
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
