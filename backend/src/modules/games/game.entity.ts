import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from 'src/common/entities';
import { GameStatsEntity } from '../game-stats/game-stats.entity';

@Entity({ name: 'games' })
export class GameEntity extends CommonEntity {
  @ApiProperty({ type: 'string', maxLength: 32, uniqueItems: true })
  @Column({ length: 32, unique: true })
  name: string;

  @ApiHideProperty()
  @OneToMany(() => GameStatsEntity, ({ game }) => game, { nullable: true })
  gamestats: GameStatsEntity[];
}
