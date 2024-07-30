import { IsOptional, IsNumber, IsEnum, ValidateIf } from 'class-validator';
import { PigState } from '../schema/pig.schema';

export class CreatePigDto {
  @IsOptional()
  @IsNumber()
  @ValidateIf((o) => o.pigStage !== PigState.Piglet)
  weight: number;

  @IsOptional()
  @IsEnum(PigState)
  pigStage?: PigState;

  @IsOptional()
  @IsNumber()
  @ValidateIf((o) => o.pigStage !== PigState.Piglet)
  slaughterPrice?: number;

  @IsOptional()
  @IsNumber()
  unitPrice: number;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;
}
