import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { CreateInvoiceService } from './create-invoice.service';
import { GetAllInvoicesService } from './get-all-invoices.service';
import { FindMissingConsecutivesService } from './utils/find-missing-consecutives.service';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly createInvoiceService: CreateInvoiceService,
    private readonly getAllInvoicesService: GetAllInvoicesService,
    private readonly findMissingConsecutivesService: FindMissingConsecutivesService,
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
}
