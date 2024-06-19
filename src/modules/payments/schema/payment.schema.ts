import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type PaymentDocument = Payment & Document;
@Schema()
export class Payment {

  @Prop({ type: Types.ObjectId, ref: 'Customers',required: true })
  customerId: Types.ObjectId;

  @Prop({required: true})
  paymentValue: number;

  @Prop({})
  paidValue: number;
  
  @Prop({})
  date: Date;

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);