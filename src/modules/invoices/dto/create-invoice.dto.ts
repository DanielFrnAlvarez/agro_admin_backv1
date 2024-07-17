import {
  IsNotEmpty,
  IsDateString,
  IsString,
  IsArray,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  invoiceConsecutive: string;

  @IsNotEmpty()
  @IsDateString()
  // YY-MM-DD
  date: Date;

  @IsNotEmpty()
  @IsMongoId()
  customerId: Types.ObjectId;

  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  pigList: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  paymentList?: Types.ObjectId[];
}
