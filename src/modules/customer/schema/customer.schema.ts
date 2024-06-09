import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Invoice } from "src/modules/invoice/schema/invoice.schema";

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {

  @Prop({ required: true, unique: true, minlength: 3, maxlength: 30 })
  customername: string;

  @Prop({ maxlength: 30 })
  displayName: string;

  @Prop({ maxlength: 15, minlength: 10 })
  contactNumber: string;

  @Prop({ maxlength: 20, minlength: 5 })
  documentNumber: string;

  @Prop({ maxlength: 100, minlength: 5, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, })
  email: string;

  @Prop({ maxlength: 500 })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Invoice' }] })
  invoices: Invoice[];

  // TODO ADD TOTAL DEBT

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);