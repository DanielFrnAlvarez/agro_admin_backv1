import { IsDate, IsMongoId, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentDto{
  @IsNotEmpty()
  @IsNumber()
  paymentValue: number;

  @IsNotEmpty()
  @IsMongoId()
  customerId: string;

  @IsDate()
  date?: Date;
}