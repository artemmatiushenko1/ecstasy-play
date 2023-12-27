import { GameEntity } from 'src/modules/games/game.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const data: Partial<GameEntity>[] = [
  { id: 'e5333601-bfee-4af8-bc01-ad1370087c32', name: 'Snake' },
  { id: '7169f53c-03db-4373-bf5e-f72be163c4ab', name: 'Tetris' },
  { id: 'adb5d416-6ce2-44df-b1d4-e6362d8c71b4', name: 'Connect Tiles' },
];

export class Games1703711425611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.synchronize();
    await queryRunner.connection.getRepository(GameEntity).save(data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .getRepository(GameEntity)
      .delete(data.map(({ id }) => id));
  }
}
