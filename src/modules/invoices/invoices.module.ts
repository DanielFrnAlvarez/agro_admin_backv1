import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { Invoice, InvoiceSchema } from "./schema/invoice.schema";
import { Payment, PaymentSchema } from "../payments/schema/payment.schema";
import { Customer, CustomerSchema } from "../customers/schema/customer.schema";
import { PaymentsService } from "../payments/payments.service";
import { PaymentsController } from "../payments/payments.controller";
import { CustomersService } from "../customers/customers.service";
import { InvoicesController } from "./invoices.controller";
import { InvoicesService } from "./invoices.service";

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Invoice.name,
        schema: InvoiceSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema
      },
      {
        name: Payment.name,
        schema: PaymentSchema
      },
    ])
  ],
  providers:[InvoicesService, PaymentsService, CustomersService],
  controllers:[InvoicesController]
})
export class InvoicesModule { }