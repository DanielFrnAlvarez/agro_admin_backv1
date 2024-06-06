import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ required: true, unique: true, minlength: 3, maxlength: 30 })
  username: string;

  @Prop({ maxlength: 30 })
  displayName: string;

  @Prop({ maxlength: 15, minlength: 10 })
  contactNumber: string;

}

export const UserSchema = SchemaFactory.createForClass(User);