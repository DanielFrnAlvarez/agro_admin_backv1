import { IsDate, IsNotEmpty, IsNumber, IsOptional, Validate } from "class-validator";
import { IsObjectId } from "src/common/validators/is-object-id.validator";

export class CreatePaymentDto{
  @IsNotEmpty()
  @IsNumber()
  paymentValue: number;

  @IsNotEmpty()
  @Validate(IsObjectId)
  customerId: string;

  @IsOptional()
  @IsDate()
  date?: Date;
  // todo QUEDE TERMINANDO EL ENDPOINT DE PAYMENT
}