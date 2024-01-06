import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { IdDto } from 'src/common/dto';

export class CreateGameStatsDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'integer', example: 120, required: true })
  public readonly time: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'integer', example: 500, required: true })
  public readonly score: number;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({ type: IdDto, required: true })
  public readonly game: IdDto;
}
