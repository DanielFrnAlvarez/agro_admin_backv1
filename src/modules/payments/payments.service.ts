import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "./schema/payment.schema";
import { Model } from "mongoose";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentsService{
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>){}

  async createPayment(createPaymentDto: CreatePaymentDto){
    const newPayment = new this.paymentModel({
      paymentValue: createPaymentDto.paymentValue,
      customerId: createPaymentDto.customerId
    });
    return await newPayment.save();
  }

  deletePayment(id:string){
    return this.paymentModel.findByIdAndDelete(id);
  }
}