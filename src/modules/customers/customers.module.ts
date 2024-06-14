import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "./schema/customer.schema";
import { CustomersService } from "./customers.service";
import { CustomersController } from "./customers.controller";

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: Customer.name,
      schema: CustomerSchema
    }])
  ],
  providers:[CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule{}