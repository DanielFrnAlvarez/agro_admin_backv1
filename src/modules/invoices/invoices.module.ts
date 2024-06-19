import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { Invoice, InvoiceSchema } from "./schema/invoice.schema";

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Invoice.name,
        schema: InvoiceSchema,
      }
    ])
  ],
  providers:[],
  controllers:[]
})
export class InvoicesModule { }