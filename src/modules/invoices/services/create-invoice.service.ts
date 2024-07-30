import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import {
  Invoice,
  InvoiceDocument,
} from 'src/modules/invoices/schema/invoice.schema';
import * as customerSchema from '../../customers/schema/customer.schema';
import { Pig, PigDocument } from '../../pigs/schema/pig.schema';
import { PigsService } from '../../pigs/pigs.service';
import { FindMissingConsecutivesService } from './utils/find-missing-consecutives.service';
import { TopConsecutiveInvoiceService } from './utils/top-consecutive.service';

@Injectable()
export class CreateInvoiceService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
    private readonly findMissingConsecutivesService: FindMissingConsecutivesService,
    private readonly topConsecutiveInvoiceService: TopConsecutiveInvoiceService,
    @InjectModel(customerSchema.Customer.name)
    private readonly customerModel: Model<customerSchema.CustomerDocument>,
    @InjectModel(Pig.name) private readonly pigModel: Model<PigDocument>,
    private readonly pigsService: PigsService,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    const { customerId, pigList } = createInvoiceDto;

    const customer = await this.customerModel.findById(customerId);
    if (!customer) {
      throw new ConflictException('Customer not found');
    }

    let pigIds = [];
    if (pigList && pigList.length > 0) {
      const pigDocuments = await Promise.all(
        pigList.map((pigData) => this.pigsService.createPig(pigData)),
      );
      pigIds = pigDocuments.map((pig: PigDocument) => pig._id);
    }

    const newInvoice = new this.invoiceModel({
      ...createInvoiceDto,
      pigList: pigIds,
      customerName: customer.name,
    });

    try {
      const savedInvoice = await newInvoice.save();

      const [missingConsecutives, topConsecutive] = await Promise.all([
        this.findMissingConsecutivesService.findMissingConsecutives(),
        this.topConsecutiveInvoiceService.topConsecutiveInvoice(),
      ]);
      return {
        invoice: savedInvoice,
        missingConsecutives,
        topConsecutive,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('El consecutivo de factura ya existe.');
      }
      throw error;
    }
  }
}
