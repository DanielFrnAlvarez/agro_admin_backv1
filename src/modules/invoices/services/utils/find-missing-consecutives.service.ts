import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Invoice,
  InvoiceDocument,
} from 'src/modules/invoices/schema/invoice.schema';
import { TopConsecutiveInvoiceService } from 'src/modules/invoices/services/utils/top-consecutive.service';

@Injectable()
export class FindMissingConsecutivesService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
    private readonly topConsecutiveInvoiceService: TopConsecutiveInvoiceService,
  ) {}

  async findMissingConsecutives(): Promise<number[]> {
    const maxConsecutive =
      await this.topConsecutiveInvoiceService.topConsecutiveInvoice(); // Usa el método del servicio inyectado

    if (maxConsecutive === 0) {
      return [];
    }

    const missingConsecutivesResult = await this.invoiceModel
      .aggregate([
        {
          $project: {
            invoiceConsecutive: 1,
            _id: 0,
          },
        },
        {
          $group: {
            _id: null,
            allConsecutives: { $addToSet: '$invoiceConsecutive' },
          },
        },
        {
          $project: {
            _id: 0,
            missing: {
              $setDifference: [
                { $range: [1, maxConsecutive + 1] },
                '$allConsecutives',
              ],
            },
          },
        },
      ])
      .exec();

    return missingConsecutivesResult.length > 0
      ? missingConsecutivesResult[0].missing
      : [];
  }
}
