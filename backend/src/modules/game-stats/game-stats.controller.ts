import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GameStatsService } from './game-stats.service';
import { GameStatsEntity } from './game-stats.entity';
import { IdDto } from 'src/common/dto';
import { CreateGameStatsDto, UpdateGameStatsDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '../auth/guards';

@ApiTags('game-stats')
@Controller('game-stats')
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
  ): Promise<GameStatsEntity> {
    const model = plainToInstance(GameStatsEntity, createEntityDto);

    return this.gameStatsService.createOne(model);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateGameStatsDto,
  ): Promise<GameStatsEntity> {
    const model = plainToInstance(GameStatsEntity, updateEntityDto);

    return this.gameStatsService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto): Promise<GameStatsEntity> {
    return this.gameStatsService.deleteOne(conditions);
  }
}
