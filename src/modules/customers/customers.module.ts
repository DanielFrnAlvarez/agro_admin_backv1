import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "./schema/customer.schema";
import { CustomersService } from "./customers.service";
import { CustomersController } from "./customers.controller";
import { Invoice, InvoiceSchema } from "../invoices/schema/invoice.schema";
import { Payment, PaymentSchema } from "../payments/schema/payment.schema";

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema
      },
      {
        name: Invoice.name,
        schema: InvoiceSchema
      },
      {
        name: Payment.name,
        schema: PaymentSchema
      },
    ])
  ],
  providers:[CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule{}