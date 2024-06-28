import { Body, Controller, Get, Post } from "@nestjs/common";
import { InvoicesService } from "./invoices.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { validateCustomerExistence } from "src/common/validators/customer-exists.validator";
import { CustomersService } from "../customers/customers.service";

@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly customerService: CustomersService
  ) {}

  @Post()
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    await validateCustomerExistence(this.customerService, String(createInvoiceDto.customerId));
    
    return await this.invoicesService.createInvoice(createInvoiceDto);
  }

  @Get()
  async getAllInvoices(){
    return await this.invoicesService.getAllInvoices();
  }
}
