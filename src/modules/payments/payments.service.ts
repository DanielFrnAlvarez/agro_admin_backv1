import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "./schema/payment.schema";
import { Model } from "mongoose";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { CustomersService } from "../customers/customers.service";

@Injectable()
export class PaymentsService{
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    private customersService: CustomersService
  ){}

  async createPayment(createPaymentDto: CreatePaymentDto){
    await this.customersService.getCustomerById(createPaymentDto.customerId);

    const newPayment = new this.paymentModel({
      paymentValue: createPaymentDto.paymentValue,
      cutomerId: createPaymentDto.customerId
    });
    return await newPayment.save();
  }
}