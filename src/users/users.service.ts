import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from 'config/schemas/user.schema';
// This should be a real class/interface representing a user entity
export type IUser = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(createUserDto: any): Promise<User> {
    const createdUser = await this.UserModel.create(createUserDto);
    return createdUser.save();
  }

  async findOne(username: string): Promise<IUser | undefined> {
    return await this.UserModel.find((user: any) => user.username === username);
  }
}
