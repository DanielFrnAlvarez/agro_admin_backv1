import { Body, Controller, Post } from "@nestjs/common"
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) { }

  @Post()
  createPayment(@Body() createPaymentDto: CreatePaymentDto){
    console.log(createPaymentDto);
    return this.paymentsService.createPayment(createPaymentDto);
  }
}