import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

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
  @Prop({ type: Boolean, default: true })
  isDisabled: boolean;
  @Prop({ type: String })
  salt: string;
  @Prop({ type: [Number], default: [0, 0] })
  coordinates: number[];
  @Prop({ type: String })
  imgAvatar: string;

  /* async setPassword(password: string) {
    const generatedSalt = await bcryptjs.genSalt(10); // Generate a salt
    this.salt = generatedSalt; // Store the generated salt in the User entity
    this.password = await bcryptjs.hash(password, this.salt); // Hash the password using the generated salt
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcryptjs.hash(password, this.salt);
    return hash === this.password;
  } */
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

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', hashPassword);
