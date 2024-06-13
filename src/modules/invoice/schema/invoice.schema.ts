import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Customers } from "src/modules/customers/schema/customers.schema";

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {

  @Prop({ required: true, unique: true })
  invoiceConsecutive: string;

  @Prop({ required: true })
  date: Date

  @Prop({})
  partialPayments: number

  @Prop({})
  totalWeight: number

  @Prop({})
  totalPrice: number

  @Prop({ default: false })
  isPaid: boolean

  @Prop({type:[{type: Types.ObjectId, ref:'Customers'}]})
  customer: Customers;
  //TODO ADD PRODUCT LIST

}