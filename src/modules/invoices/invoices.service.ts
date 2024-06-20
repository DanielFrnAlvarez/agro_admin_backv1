import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { CreatePigDto } from "../pigs/dto/create-pig.dto";
import { Invoice } from "./schema/invoice.schema";

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,) { }

  async createInvoice(createInvoiceDto: CreateInvoiceDto,) {
    const newInvoice = new this.invoiceModel(createInvoiceDto);
    return await newInvoice.save();
  }
}
