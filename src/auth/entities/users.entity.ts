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

  checkpass: Function;
}

async function hashPassword(next: Function) {
  /* 
  Podría haber una pérdida de referencia a this, 
  lo que podría estar causando que this no apunte al objeto User que esperas. 
  En estos casos, almacenar la referencia a this en una variable 
  como user es una práctica común para asegurarse de que se pueda acceder correctamente a las propiedades 
  del archivo.
  */

  const user = this;
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
async function comparePassword(password: string): Promise<void> {
  const user = this;
  const hash = await bcryptjs.compare(password, user.password);
  if (!hash) {
    throw new UnauthorizedException('Invalid password');
  }
}
//sd

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', hashPassword);
UserSchema.methods.checkpass = comparePassword;
