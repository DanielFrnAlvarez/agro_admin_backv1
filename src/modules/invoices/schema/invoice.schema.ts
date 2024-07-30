import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Customer } from 'src/modules/customers/schema/customer.schema';
import { Payment } from 'src/modules/payments/schema/payment.schema';
import { Pig } from 'src/modules/pigs/schema/pig.schema';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {
  @Prop({ required: true, unique: true })
  invoiceConsecutive: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Customer' })
  customerId: Customer;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'Pigs' }] })
  pigList: Pig[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Payments' }] })
  paymentList: Payment[];

  @Prop({})
  totalWeight: number;

  @Prop({})
  totalPrice: number;

  @Prop({})
  debt: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
