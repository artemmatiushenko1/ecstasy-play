import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from 'src/common/entities';
import { GameEntity } from '../games/game.entity';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'game-stats' })
export class GameStatsEntity extends CommonEntity {
  @ApiProperty({ type: 'integer' })
  @Column({ type: 'integer' })
  time: number;

  @ApiProperty({ type: 'integer' })
  @Column({ type: 'integer' })
  score: number;

  @ApiProperty({ type: () => GameEntity })
  @ManyToOne(() => GameEntity, ({ gamestats }) => gamestats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  game: GameEntity;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
