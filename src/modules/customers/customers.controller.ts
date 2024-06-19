import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CreateCustomersDto } from "./dto/create-customer.dto";
import { ValidateObjectIdPipe } from "src/common/pipes/validate-id.pipe";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { throwHttpException } from "src/common/utils/exceptions/http-exception.utils";

@Controller('customers')
export class CustomersController {

  constructor(private customersService: CustomersService) { }
  @Post()
  createCustomer(@Body() createCustomersDto: CreateCustomersDto) {
    return this.customersService.createCustomers(createCustomersDto);
  }

  @Get()
  getCustomers() {
    return this.customersService.getCustomers();
  }
  
  @Get(':id')
  async getCustomerById(@Param('id', ValidateObjectIdPipe) id: string) {
    const findCustomer = await this.customersService.getCustomerById(id);
    if (!findCustomer) { throwHttpException('User not found', 404) }
    return findCustomer;
  }
  
  @Patch(':id')
  async updateCustomer(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() UpdateCustomerDto: UpdateCustomerDto) {
    const updateCustomer = await this.customersService.updateCustomer(id, UpdateCustomerDto);
    if (!updateCustomer) { throwHttpException('User not found', 404) }
    return updateCustomer;
  }

  @Delete(':id')
  async deleteCustomer(@Param('id', ValidateObjectIdPipe) id: string) {
    const deleteCustomer = await this.customersService.deleteCustomer(id);
    if (!deleteCustomer) { throwHttpException('User not found', 404) }
    return;
  }
}