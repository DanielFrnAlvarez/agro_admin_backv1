import { Body, Controller, Get, HttpException, Param, Post } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CreateCustomersDto } from "./dto/customers.dto";

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
  async getCustomerById(@Param('id') id: string) {
    const findCustomer = await this.customersService.getCustomerById(id);
    if (!findCustomer) { throw new HttpException('User not found', 404) }
    return findCustomer;
  }
}