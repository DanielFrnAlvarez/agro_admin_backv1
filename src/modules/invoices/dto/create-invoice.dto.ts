import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsDateString,
  IsArray,
  IsMongoId,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Types } from 'mongoose';
import { Pig } from 'src/modules/pigs/schema/pig.schema';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsNumber()
  invoiceConsecutive: number;

  @IsNotEmpty()
  @IsDateString()
  // YY-MM-DD
  date: Date;

  @IsNotEmpty()
  @IsMongoId()
  customerId: Types.ObjectId;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Pig)
  pigList?: Pig[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  paymentList?: Types.ObjectId[];
}
