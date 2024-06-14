import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./schema/customer.schema";
import { Model } from "mongoose";
import { CreateCustomersDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customersModel: Model<Customer>) { }

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

  updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customersModel.findByIdAndUpdate(id, updateCustomerDto, { new: true });
  }
}