import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schema/customer.schema';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { throwHttpException } from 'src/common/utils/exceptions/http-exception.utils';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  createCustomer(createCustomerDto: CreateCustomerDto) {
    const newCustomers = new this.customerModel(createCustomerDto);
    return newCustomers.save();
  }

  getCustomers() {
    return this.customerModel.find();
  }

  async getCustomerById(id: string) {
    const customer = await this.customerModel.findById(id).populate('invoices');
    if (!customer) {
      throwHttpException('Customer not found');
    }
    return customer;
  }

  updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerDto, {
      new: true,
    });
  }

  deleteCustomer(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
