import { IsNotEmpty, IsString, IsEmail, IsEnum, MinLength, MaxLength } from 'class-validator';
import { UserRole } from '../schema/users.schema';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  phone: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  access: UserRole;
}
