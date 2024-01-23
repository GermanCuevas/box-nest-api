import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document } from 'mongoose';

enum StatusOptions {
  in_course = 'in course',
  pending = 'pending',
  delivered = 'delivered',
  created = 'created'
}

@Schema()
export class Package extends Document {
  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Number, required: true })
  addressNumber: number;

  @Prop({ type: Number, required: true })
  postalCode: number;

  @IsOptional()
  @Prop({ type: String })
  apartment: string;

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
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop({ type: Date, default: null })
  assignedDate: Date;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
