import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Photo extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop()
  caption: string;

  @Prop()
  albumId: string;

  @Prop()
  uploadedBy: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);