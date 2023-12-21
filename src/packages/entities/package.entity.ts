import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { Document } from 'mongoose';

enum StatusOptions {
  in_course = 'in course',
  pending = 'pending',
  deliveried = 'deliveried',
  created = 'created'
}

@Schema()
export class Package extends Document {
  @Prop({ type: String, required: true })
  address: string;
  @Prop({
    type: String,
    enum: Object.values(StatusOptions),
    default: StatusOptions.created
  })
  status: string;
  @Prop({ type: String, required: true })
  deliveryCode: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: Date, required: true })
  deadLine: Date;
  @Prop({ type: Date, default: Date.now })
  deliveriedDate: Date;
  @Prop({ type: [Number], default: [0, 0] })
  coordinates: number[];
  @Prop({ type: String, required: true })
  receptorName: string;
  @Prop({ type: Number, required: true })
  weight: number;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
