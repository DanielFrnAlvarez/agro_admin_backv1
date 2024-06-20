import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { ValidateObjectIdPipe } from "src/common/pipes/validate-id.pipe";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { throwHttpException } from "src/common/utils/exceptions/http-exception.utils";

@Controller('customers')
export class CustomersController {

  constructor(private customersService: CustomersService) { }
  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.createCustomer(createCustomerDto);
  }

  @Get()
  async getCustomers() {
    return await this.customersService.getCustomers();
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