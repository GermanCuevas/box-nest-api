import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from 'src/packages/entities/package.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Package.name)
    private packageModel: Model<Package>
  ) {}

  async findPendingPackages() {
    const packages = await this.packageModel.find({ status: 'pending' });
    if (!packages) throw new Error('Pending packages not found');
    return packages;
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
