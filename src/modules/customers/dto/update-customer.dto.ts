import { IsEmail, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  alias?: string;

  @IsOptional()
  @Length(10, 15)
  contactNumber?: string;

  @IsOptional()
  @Length(5, 20)
  documentNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
  
  @IsOptional()
  @Max(500)
  description?: string;

  @IsOptional()
  @IsString()
  invoice: string;

}