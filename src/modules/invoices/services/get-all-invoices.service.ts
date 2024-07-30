import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Invoice,
  InvoiceDocument,
} from 'src/modules/invoices/schema/invoice.schema';

@Injectable()
export class GetAllInvoicesService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}

  async getAllInvoices(
    page: number = 1,
    pageSize: number = 20,
  ): Promise<Invoice[]> {
    const invoices = await this.invoiceModel
      .find()
      .sort({ date: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .exec();
    return invoices;
  }
}
