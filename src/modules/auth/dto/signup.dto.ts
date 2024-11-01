import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @ApiProperty({ type: 'string', description: 'Firstname of User' })
  firstname: string;

  @IsOptional()
  @ApiProperty({ type: 'string', description: 'Lastname of User' })
  lastname?: string;

  @ApiProperty({ type: 'string', description: 'Email of User' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', description: 'Phone Number of User' })
  @IsString()
  @Length(10,10)
  phone: string;

  @IsString()
  @ApiProperty({ type: 'string', description: 'Password of User' })
  @Length(8, 18)
  password: string;
}
