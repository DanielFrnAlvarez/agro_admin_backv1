import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Customer } from "src/modules/customers/schema/customer.schema";
import { Payment } from "src/modules/payments/schema/payment.schema";

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {

  @Prop({ required: true, unique: true })
  invoiceConsecutive: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'Customers' }] })
  customer: Customer;

  @Prop({type: [{ type: Types.ObjectId, ref: 'Customers' }]})
  paymentList: Payment[];

  @Prop({})
  totalWeight: number;

  @Prop({})
  totalPrice: number;

  @Prop({ default: false })
  debt: number;

  
  //TODO ADD PIGS LIST

}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);