import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { Invoice } from "./schema/invoice.schema";

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,) { }

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    try {
      const newInvoice  = new this.invoiceModel(createInvoiceDto);
      return await newInvoice.save();
    } catch (error) {
      if (error.code === 11000) { // Código de error para duplicados en MongoDB
        throw new ConflictException('El consecutivo de factura ya existe.');
      }
      throw error;
    }
  }

  async getAllInvoices(page: number = 1, pageSize: number = 20): Promise<Invoice[]> {
    const invoices = await this.invoiceModel
        .find()
        .sort({ date: -1 }) // Ordenar por fecha de la más nueva a la más antigua
        .limit(pageSize)    // Limitar el resultado a 20 invoices por consulta
        .skip((page - 1) * pageSize) // Calcular el desplazamiento según la página solicitada
        .exec();
    return invoices;
}
}
