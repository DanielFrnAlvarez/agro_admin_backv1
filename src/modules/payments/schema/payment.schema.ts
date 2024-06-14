import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Customer } from "src/modules/customers/schema/customer.schema";

export type PaymentDocument = Payment & Document;

export class Payment {

  @Prop({ type:[{type: Types.ObjectId, ref: 'Customers'}],required: true })
  cutomerId: Customer;

  @Prop({required: true})
  paymentValue: number

  @Prop({})
  extraPayment: number
  
  @Prop({})
  date: Date

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);