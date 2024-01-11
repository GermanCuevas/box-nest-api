import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import { CreateAdminDto } from './dto/create-admin.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Package } from 'src/packages/entities/package.entity';
import { Document, Model, Types } from 'mongoose';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
// import { UpdatePackageDto } from '../packages/dto/update-package.dto';
import { UpdateUserStatusDto } from './dto/update-userStatus.dto';
import { User } from 'src/auth/entities/users.entity';
import { History } from 'src/history/entities/history.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { userInfo } from 'os';
import { DeliveredAdminDto } from './dto/delivered-admin-dto';

interface UserInternal {
  _id: Types.ObjectId;
  name: string;
  lastname: string;
  email: string;
  imgAvatar: string;
  password: string;
  isAdmin: boolean;
  isDisabled: boolean;
  coordinates: number[];
  packagesPending: any[];
  packageInCourse: any | null;
  salt: string;
  __v: number;
}
interface TopPackages {
  [email: string]: {
    recoveried?: number;
    image?: string;
  };
}

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
  async deliveryDetailsUser(userId: string, date: string) {
    return { userId, date };
  }

  async deliveryDetails(date: string) {
    const objTopPackages: TopPackages = {};
    const users = await this.userModel.find();
    const packages = await this.packagesModel.find();
    const packagesDelivered = await this.historyModel.find().populate('userId');
    const totalPackages = packages.concat(packagesDelivered);
    packagesDelivered.forEach(({ userId }) => {
      //sd
      // para que reconozca la estructura de un populate usar el unknowm
      // unknown es un tipo que representa un valor desconocido. Es más seguro que any ya que requiere una verificación de tipo explícita antes de ser utilizado.
      const infoUser = userId as unknown as UserInternal;
      if (!objTopPackages[infoUser.email]) objTopPackages[infoUser.email] = {};
      if (!objTopPackages[infoUser.email]['recoveried']) {
        objTopPackages[infoUser.email]['recoveried'] = 0;
      }
      objTopPackages[infoUser.email]['recoveried']++;
      objTopPackages[infoUser.email]['image'] = infoUser.imgAvatar;
    });
    const usersAbles = users.filter((user) => !user.isDisabled);
    const sortedEntries = Object.entries(objTopPackages)
      .sort((a, b) => b[1].recoveried - a[1].recoveried)
      .map((x) => ({ email: x[0], imageUrl: x[1].image, deliveredNum: x[1].recoveried }));

    console.log(sortedEntries);

    const allDetails = {
      users: {
        availables: usersAbles,
        availablesLength: usersAbles.length,
        totalUsers: users,
        totalUsersLength: users.length,
        percentage: (usersAbles.length / users.length) * 100
      },
      packages: {
        deliveryAverage: sortedEntries,
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
