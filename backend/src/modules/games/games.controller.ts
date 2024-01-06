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
import { GamesService } from './games.service';
import { GameEntity } from './game.entity';
import { IdDto } from 'src/common/dto';
import { CreateGameDto, UpdateGameDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '../auth/guards';

@ApiTags('games')
@Controller('games')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll(): Promise<GameEntity[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<GameEntity> {
    return this.gamesService.findOne(conditions);
  }

  @Post()
  createOne(@Body() createEntityDto: CreateGameDto): Promise<GameEntity> {
    const model = plainToInstance(GameEntity, createEntityDto);

    return this.gamesService.createOne(model);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateGameDto,
  ): Promise<GameEntity> {
    const model = plainToInstance(GameEntity, updateEntityDto);

    return this.gamesService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto): Promise<GameEntity> {
    return this.gamesService.deleteOne(conditions);
  }
}
