import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice, InvoiceDocument } from '../../schema/invoice.schema';
import { Model } from 'mongoose';

@Injectable()
export class TopConsecutiveInvoiceService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}
  async topConsecutiveInvoice(): Promise<number> {
    const topConsecutiveInvoice = await this.invoiceModel
      .aggregate([
        { $group: { _id: null, max: { $max: '$invoiceConsecutive' } } },
      ])
      .exec();

    if (topConsecutiveInvoice.length === 0) {
      return 0;
    }

    const maxConsecutive = topConsecutiveInvoice[0].max;

    return Number(maxConsecutive);
  }
}
