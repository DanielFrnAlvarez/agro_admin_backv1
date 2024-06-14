import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomersDto {
  @IsNotEmpty()
  @IsString()
  name: String;
  
  @IsString()
  @IsOptional()
  alias?: String;
  
}