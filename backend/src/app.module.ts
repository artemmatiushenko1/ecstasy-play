import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users';
import { DatabaseModule } from './systems/database';
import { GamesModule } from './modules/games';
import { GameStatsModule } from './modules/game-stats';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    GamesModule,
    GameStatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
