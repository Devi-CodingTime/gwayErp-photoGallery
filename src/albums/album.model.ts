import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Album extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  createdBy: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);