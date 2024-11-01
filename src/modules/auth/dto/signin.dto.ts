import { ApiProperty } from '@nestjs/swagger';
import {IsString, Length } from 'class-validator';

export class SignInDto {
  @ApiProperty({ type: 'string', description: 'Phone Number of User' })
  @IsString()
  @Length(10,10)
  phone: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Password of User' })
  @Length(8, 18)
  password: string;
}
