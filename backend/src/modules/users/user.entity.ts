import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity } from 'src/common/entities';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from 'src/common/enums';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @ApiProperty({ type: 'string', maxLength: 32 })
  @Column({ length: 32 })
  name: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ length: 256 })
  password: string;

  @ApiProperty({ type: 'string', maxLength: 256, uniqueItems: true })
  @Column({ length: 256, unique: true })
  email: string;

  @ApiProperty({ enum: UserRoleEnum, default: UserRoleEnum.USER })
  @Column({ enum: UserRoleEnum, default: UserRoleEnum.USER, nullable: false })
  role: UserRoleEnum;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
  }
}
