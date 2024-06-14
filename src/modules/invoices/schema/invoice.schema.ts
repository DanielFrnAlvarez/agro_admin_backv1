import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Customer } from "src/modules/customers/schema/customer.schema";

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {

  @Prop({ required: true, unique: true })
  invoiceConsecutive: string;

  @Prop({ required: true })
  date: Date

  @Prop({})
  totalWeight: number

  @Prop({})
  totalPrice: number

  @Prop({ default: false })
  isPaid: boolean

  @Prop({type:[{type: Types.ObjectId, ref:'Customers'}]})
  customer: Customer;
  //TODO ADD PRODUCT LIST
  //TODO ADD PAYMENTS LIST

}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);