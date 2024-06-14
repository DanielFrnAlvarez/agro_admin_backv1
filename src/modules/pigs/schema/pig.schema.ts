import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PigDocument = Pig & Document;

export enum PigState {
  Piglet = 'Piglet',
  Growing = 'Growing',
  Finishing = 'Finishing'
}

@Schema()
export class Pig{
  @Prop({})
  weight: number;

  @Prop({
    type: String,
    enum: PigState,
  })
  state: PigState;
  // Campos biológicos aquí

  @Prop({})
  Pricing: {
    unitPrice: number;
    slaughterPrice: number;
    totalPrice: number;
  };

}

export const PigSchema = SchemaFactory.createForClass(Pig);