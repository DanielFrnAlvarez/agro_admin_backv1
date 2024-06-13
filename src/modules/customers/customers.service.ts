import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customers } from "./schema/customers.schema";
import { Model } from "mongoose";
import { CreateCustomersDto } from "./dto/customers.dto";

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customers.name) private customersModel: Model<Customers>) { }

  createCustomers(createCustomersDto: CreateCustomersDto) {
    const newCustomers = new this.customersModel(createCustomersDto);
    return newCustomers.save();
  }
  getCustomers() {
    return this.customersModel.find();
  }
  getCustomerById(id: string) {
    return this.customersModel.findById(id);
  }
}