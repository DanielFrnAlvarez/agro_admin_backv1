import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/agro_admin_v1'),
    CustomersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
