import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./schema/customer.schema";
import { Model } from "mongoose";
import { CreateCustomersDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { throwHttpException } from "src/common/utils/exceptions/http-exception.utils";

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) { }

  createCustomers(createCustomersDto: CreateCustomersDto) {
    const newCustomers = new this.customerModel(createCustomersDto);
    return newCustomers.save();
  }
  
  getCustomers() {
    return this.customerModel.find();
  }

  async getCustomerById(id: string) {
    const customer = await this.customerModel.findById(id).populate('invoices');
    if(!customer) {
      throwHttpException('Customer not found')
    }
    return customer;
  }

  updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true });
  }

  deleteCustomer(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}