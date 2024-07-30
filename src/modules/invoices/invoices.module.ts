import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './schema/invoice.schema';
import { Payment, PaymentSchema } from '../payments/schema/payment.schema';
import { Customer, CustomerSchema } from '../customers/schema/customer.schema';
import { PigsService } from '../pigs/pigs.service';
import { PaymentsService } from '../payments/payments.service';
import { CustomersService } from '../customers/customers.service';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './services/invoices.service';
import { Pig, PigSchema } from '../pigs/schema/pig.schema';
import { CreateInvoiceService } from './services/create-invoice.service';
import { GetAllInvoicesService } from './services/get-all-invoices.service';
import { FindMissingConsecutivesService } from './services/utils/find-missing-consecutives.service';
import { TopConsecutiveInvoiceService } from './services/utils/top-consecutive.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Invoice.name,
        schema: InvoiceSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
      {
        name: Pig.name,
        schema: PigSchema,
      },
    ]),
  ],
  providers: [
    InvoicesService,
    CreateInvoiceService,
    GetAllInvoicesService,
    FindMissingConsecutivesService,
    TopConsecutiveInvoiceService,
    PaymentsService,
    CustomersService,
    PigsService,
  ],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
