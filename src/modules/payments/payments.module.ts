import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Payment, PaymentSchema } from "./schema/payment.schema";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { Customer, CustomerSchema } from "../customers/schema/customer.schema";
import { CustomersService } from "../customers/customers.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:Payment.name,
        schema: PaymentSchema,
      },
      {
        name:Customer.name,
        schema: CustomerSchema,
      }
    ])
  ],
  providers:[PaymentsService, CustomersService],
  controllers: [PaymentsController]
})
export class PaymentsModule { }