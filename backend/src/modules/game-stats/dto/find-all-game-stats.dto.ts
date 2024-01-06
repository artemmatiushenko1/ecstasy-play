import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class FindAllGameStatsDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    required: false,
    nullable: true,
  })
  gameId?: string;
}
