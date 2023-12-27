import { Module } from '@nestjs/common';
import { GameStatsEntity } from './game-stats.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameStatsService } from './game-stats.service';
import { GameStatsController } from './game-stats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GameStatsEntity])],
  controllers: [GameStatsController],
  providers: [GameStatsService],
  exports: [GameStatsService],
})
export class GameStatsModule {}
