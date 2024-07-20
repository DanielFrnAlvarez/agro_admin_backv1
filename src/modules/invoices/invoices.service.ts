import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './schema/invoice.schema';
import {
  Customer,
  CustomerDocument,
} from '../customers/schema/customer.schema';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    const { customerId } = createInvoiceDto;
    const customer = await this.customerModel.findById(customerId);

    if (!customer) {
      throw new ConflictException('Customer not found');
    }

    const newInvoice = new this.invoiceModel({
      ...createInvoiceDto,
      customerName: customer.name, // Popula el customerName
    });

    try {
      return await newInvoice.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('El consecutivo de factura ya existe.');
      }
      throw error;
    }
  }

  async getAllInvoices(
    page: number = 1,
    pageSize: number = 20,
  ): Promise<Invoice[]> {
    const invoices = await this.invoiceModel
      .find()
      .sort({ date: -1 }) // Ordenar por fecha de la más nueva a la más antigua
      .limit(pageSize) // Limitar el resultado a 20 invoices por consulta
      .skip((page - 1) * pageSize) // Calcular el desplazamiento según la página solicitada
      .exec();
    return invoices;
  }
}
