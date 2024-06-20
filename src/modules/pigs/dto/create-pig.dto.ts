import { IsOptional, IsNumber, IsEnum } from "class-validator";
import { PigState } from "../schema/pig.schema";

export class CreatePigDto {
  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsEnum(PigState)
  pigStage: PigState;

  @IsOptional()
  @IsNumber()
  slaughterPrice?: number;

  @IsOptional()
  @IsNumber()
  unitPrice: number;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;
}