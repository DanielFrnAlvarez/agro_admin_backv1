import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: String;
  
  @IsString()
  @IsOptional()
  alias?: String;
  
}