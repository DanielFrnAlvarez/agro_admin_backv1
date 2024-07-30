import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreatePaymentDto{
  @IsNotEmpty()
  @IsNumber()
  paymentValue: number;

  @IsNotEmpty()
  @IsMongoId()
  customerId: string;

  @IsDate()
  @IsOptional()
  date?: Date;
}