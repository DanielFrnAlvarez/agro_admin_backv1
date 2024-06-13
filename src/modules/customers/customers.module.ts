import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Customers, CustomersSchema } from "./schema/customers.schema";
import { CustomersService } from "./customers.service";
import { CustomersController } from "./customers.controller";

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: Customers.name,
      schema: CustomersSchema
    }])
  ],
  providers:[CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule{}