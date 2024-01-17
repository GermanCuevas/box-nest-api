import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class History extends Document {
  @Prop({ type: String, required: true })
  address: string;
  @Prop({ type: String, required: true })
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
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
