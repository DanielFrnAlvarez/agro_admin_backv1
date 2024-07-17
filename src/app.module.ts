import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomersModule } from './modules/customers/customers.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PigsModule } from './modules/pigs/pigs.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/agro_admin_v1'),
    CustomersModule,
    InvoicesModule,
    PaymentsModule,
    PigsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
