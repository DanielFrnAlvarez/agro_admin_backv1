import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './modules/customers/customers.module';
import { IsObjectId } from './common/validators/is-object-id.validator';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/agro_admin_v1'),
    CustomersModule,
    PaymentsModule
  ],
  controllers: [],
  providers: [IsObjectId],
})
export class AppModule { }
