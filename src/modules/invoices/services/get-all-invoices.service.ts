import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Invoice,
  InvoiceDocument,
} from 'src/modules/invoices/schema/invoice.schema';
import { TopConsecutiveInvoiceService } from './utils/top-consecutive.service';
import { FindMissingConsecutivesService } from './utils/find-missing-consecutives.service';

@Injectable()
export class GetAllInvoicesService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
    private readonly topConsecutiveInvoiceService: TopConsecutiveInvoiceService,
    private readonly findMissingConsecutivesService: FindMissingConsecutivesService,
  ) {}

  async getAllInvoices(
    page: number = 1,
    pageSize: number = 20,
  ): Promise<{
    invoiceData: Invoice[];
    topConsecutive: number;
    missingConsecutives: number[];
  }> {
    const invoicesData = await this.invoiceModel
      .find()
      .sort({ date: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .exec();
    const [topConsecutive, missingConsecutives] = await Promise.all([
      this.topConsecutiveInvoiceService.topConsecutiveInvoice(),
      this.findMissingConsecutivesService.findMissingConsecutives(),
    ]);
    return { invoiceData: invoicesData, topConsecutive, missingConsecutives };
  }
}
