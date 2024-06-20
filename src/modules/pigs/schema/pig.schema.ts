import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PigDocument = Pig & Document;

export enum PigState {
  Piglet = 'Piglet',
  Growing = 'Growing',
  Finishing = 'Finishing'
}

@Schema()
export class Pig {

  @Prop({})
  weight: number;

  @Prop({
    type: String,
    enum: PigState,
  })
  pigStage: PigState;

  @Prop({})
  slaughterPrice?: number;

  @Prop({})
  unitPrice: number;

  @Prop({})
  totalPrice: number;
}

export const PigSchema = SchemaFactory.createForClass(Pig);
