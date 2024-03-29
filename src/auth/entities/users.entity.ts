import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  lastname: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;
  // isDisabled lo maneja el admin
  @Prop({ type: Boolean, default: false })
  isDisabled: boolean;
  @Prop({ type: String })
  salt: string;
  @Prop({ type: [Number], default: [0, 0] })
  coordinates: number[];
  @Prop({ type: String, default: '' })
  imgAvatar: string;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Package' }], default: [] })
  packagesPending: MongooseSchema.Types.ObjectId[];
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Package', default: null })
  packageInCourse: MongooseSchema.Types.ObjectId | null;
  @Prop({ type: Date, default: null })
  lastSwornStatement: Date;
  // isSuitable lo maneja el resultado del statement
  @Prop({ type: Boolean, default: true })
  isSuitable: boolean;

  checkpass: Function;
}

async function hashPassword(next: Function) {
  const user = this;
  if (user.isModified('password') || user.isNew) {
    try {
      const generateSalt = await bcryptjs.genSalt(10);
      const generateHash = await bcryptjs.hash(user.password, generateSalt);
      user.salt = generateSalt;
      user.password = generateHash;
      next();
    } catch (err) {
      return next(err);
    }
  }
  next();
}

async function comparePassword(password: string): Promise<void> {
  const user = this;
  const hash = await bcryptjs.compare(password, user.password);
  if (!hash) {
    throw new UnauthorizedException('Invalid password');
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', hashPassword);
UserSchema.methods.checkpass = comparePassword;
