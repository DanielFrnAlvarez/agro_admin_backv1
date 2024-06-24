import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

export enum UserRole {
  Admin = 'admin',
  ReadOnly = 'read-only',
  Basic = 'basic'
}

@Schema()
export class User {
  @Prop({ required: true, minlength: 3, maxlength: 30 })
  name: string;

  @Prop({ required: true, unique: true, maxlength: 100, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email: string;

  @Prop({ required: true, unique: true, minlength: 10, maxlength: 15 })
  phone: string;

  @Prop({ required: true, type: String, enum: UserRole })
  access: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
