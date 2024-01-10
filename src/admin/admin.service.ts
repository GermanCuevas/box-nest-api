import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import { CreateAdminDto } from './dto/create-admin.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Package } from 'src/packages/entities/package.entity';
import { Model } from 'mongoose';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
// import { UpdatePackageDto } from '../packages/dto/update-package.dto';
import { UpdateUserStatusDto } from './dto/update-userStatus.dto';
import { User } from 'src/auth/entities/users.entity';
import { History } from 'src/history/entities/history.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Package.name)
    private packagesModel: Model<Package>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(History.name)
    private historyModel: Model<History>
  ) {}

  async addPackage(createPackageDto: CreatePackageDto) {
    try {
      const packageCreate = await this.packagesModel.create(createPackageDto);
      return packageCreate;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateUserStatus(id: string, updateUserStatusDto: UpdateUserStatusDto) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserStatusDto, { new: true });

      await user.save();
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async deliveryDetails(date: string) {
    const users = await this.userModel.find();
    const packages = await this.packagesModel.find();
    const packagesDelivered = await this.historyModel.find();
    const totalPackages = packages.concat(packagesDelivered);
    const usersAbles = users.filter((user) => !user.isDisabled);

    const allDetails = {
      users: {
        availables: usersAbles,
        availablesLength: usersAbles.length,
        totalUsers: users,
        totalUsersLength: users.length,
        percentage: (usersAbles.length / users.length) * 100
      },
      packages: {
        totalPackages,
        totalPackagesLength: totalPackages.length,
        packagesDeliveredLength: packagesDelivered.length,
        percentage: (packagesDelivered.length / totalPackages.length) * 100
      }
    };

    return allDetails;
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
