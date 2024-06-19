import { Body, Controller, Post } from "@nestjs/common"
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { validateCustomerExistence } from "src/common/validators/customer-exists.validator";
import { CustomersService } from "../customers/customers.service";

@Controller('payments')
export class PaymentsController {
  constructor(
    private paymentsService: PaymentsService, 
    private customersService: CustomersService
  ){}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    await validateCustomerExistence(this.customersService, createPaymentDto.customerId);

    return this.paymentsService.createPayment(createPaymentDto);
  }
}