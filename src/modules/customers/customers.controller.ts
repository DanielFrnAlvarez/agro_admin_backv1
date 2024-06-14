import { Body, Controller, Get, HttpException, Param, Patch, Post } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CreateCustomersDto } from "./dto/create-customer.dto";
import mongoose from "mongoose";
import { ValidateObjectIdPipe } from "src/common/pipes/validate-id.pipe";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Controller('customers')
export class CustomersController {

  constructor(private customersService: CustomersService) { }
  @Post()
  createCustomer(@Body() createCustomersDto: CreateCustomersDto) {
    console.log(createCustomersDto);
    return this.customersService.createCustomers(createCustomersDto);
  }

  @Get()
  getCustomers() {
    return this.customersService.getCustomers();
  }
  @Get(':id')
  async getCustomerById(@Param('id', ValidateObjectIdPipe) id: string) {
    const findCustomer = await this.customersService.getCustomerById(id);
    if (!findCustomer) { throw new HttpException('User not found', 404) }
    return findCustomer;
  }
  @Patch(':id')
  async updateCustomer(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() UpdateCustomerDto: UpdateCustomerDto) {
    const updateCustomer = await this.customersService.updateCustomer(id, UpdateCustomerDto);
    if (!updateCustomer) { throw new HttpException('User not found', 404) }
    return updateCustomer;
  }
}