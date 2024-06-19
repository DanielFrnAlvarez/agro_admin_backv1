import { Body, Controller, Delete, Param, Post } from "@nestjs/common"
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { validateCustomerExistence } from "src/common/validators/customer-exists.validator";
import { CustomersService } from "../customers/customers.service";
import { ValidateObjectIdPipe } from "src/common/pipes/validate-id.pipe";
import { throwHttpException } from "src/common/utils/exceptions/http-exception.utils";

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

  @Delete(':id')
  async deletePayment(@Param('id', ValidateObjectIdPipe) id:string){
    const deletePayment = await this.paymentsService.deletePayment(id);
    if(!deletePayment) { throwHttpException('Payment not found', 404); }
    return;
  }
}