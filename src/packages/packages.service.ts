import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Model } from 'mongoose';
import { Package } from './entities/package.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AddPackageUser } from './dto/add-package-user.dto';
import { User } from 'src/auth/entities/users.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Package.name)
    private packagesModel: Model<Package>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    try {
      const packageCreate = await this.packagesModel.create(createPackageDto);
      return packageCreate;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async addPackageUser(addPackageUserDto: AddPackageUser) {
    try {
      const User = await this.userModel.findById<User>(addPackageUserDto.idUser);
      if (!User) throw new NotFoundException('User not found');
      User.packagesPending.push(addPackageUserDto.idPackage);
      await User.save();
      return User;
    } catch (error) {
      switch (error.message) {
        case 'User not found':
          throw error;
          break;
        default:
          throw new InternalServerErrorException();
          break;
      }
    }
  }

  findAll() {
    return `This action returns all packages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} package`;
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
