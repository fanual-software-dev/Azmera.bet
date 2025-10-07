import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Document } from 'mongoose';


@Schema({timestamps: true})
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  bio: string;

  @Prop()
  profilePicture: string; 

  @Prop({ default: "player", enum: [ "admin", "player" ] })
  role: string;

  @Prop({ unique: true, required: true })
  phoneNumber: string;

  @Prop({ required: true})
  password: string;

  @Prop({ default: "none" })
  verificationCode: string;

  @Prop({ default: "none" })
  resetPasswordCode: string;

  @Prop( {default: false} )
  resetPasswordRequested: boolean

  @Prop({ default: 'none' })
  refreshToken: string;

  @Prop({ default: false })
  isVerified: boolean

  @Prop({ default: 0 })
  currentAmount: number
  
  @Prop({ default: 0, max: 400000 })
  dailyWin: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
