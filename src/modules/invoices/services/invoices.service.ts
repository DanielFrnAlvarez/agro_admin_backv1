import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { CreateInvoiceService } from './create-invoice.service';
import { GetAllInvoicesService } from './get-all-invoices.service';
import { FindMissingConsecutivesService } from './utils/find-missing-consecutives.service';
import { CalculateTotalValueService } from './utils/calculate-total-value.service';
import { PigDocument } from 'src/modules/pigs/schema/pig.schema';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly createInvoiceService: CreateInvoiceService,
    private readonly getAllInvoicesService: GetAllInvoicesService,
    private readonly findMissingConsecutivesService: FindMissingConsecutivesService,
    private readonly calculateTotalValueService: CalculateTotalValueService,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    return this.createInvoiceService.createInvoice(createInvoiceDto);
  }

  async getAllInvoices(page: number = 1, pageSize: number = 20) {
    return this.getAllInvoicesService.getAllInvoices(page, pageSize);
  }

  async findMissingConsecutives() {
    return this.findMissingConsecutivesService.findMissingConsecutives();
  }

  async calculateTotalValue(pigList: PigDocument[]) {
    return this.calculateTotalValueService.calculateTotalValue(pigList);
  }
}
