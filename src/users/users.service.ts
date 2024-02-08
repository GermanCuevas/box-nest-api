import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from 'src/packages/entities/package.entity';
import { Model } from 'mongoose';
import { AssignPackageUserDto } from './dto/assignPackage-user.dto';
import { User } from 'src/auth/entities/users.entity';
import { PackageSingleStatusDto } from './dto/packageSingleStatus.dto';
import { PackagePendingAndInCourseDto } from './dto/packagePendingAndInCourse.dto';
import { HistoryDto } from './dto/history.dto';
import { History } from '../history/entities/history.entity';
export interface UserWithLastSwornStatement extends User {
  lastSwornStatement: Date;
}
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Package.name)
    private packageModel: Model<Package>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(History.name)
    private historyModel: Model<History>
  ) {}

  async findAvailablePackages() {
    const packages = await this.packageModel.find({ status: 'created' });
    if (!packages) throw new Error('Created packages not found');
    return packages;
  }

  async assignPackageToUser(body: AssignPackageUserDto) {
    const { packagesIds, userId } = body;

    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');

    const arrayPromises = packagesIds.map(async (idPackage) => {
      const eachPackage = await this.packageModel.findByIdAndUpdate(idPackage, {
        status: 'pending',
        assignedDate: new Date()
      });
      if (!eachPackage) {
        throw new Error('Package not found');
      }
      return user.packagesPending.push(idPackage);
    });
    await Promise.all(arrayPromises);
    user.save();

    return;
  }

  async cancelAssignedPackage(body: PackageSingleStatusDto) {
    const { packageId, userId } = body;
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');

    const cancelingPackageInCourse = user.packageInCourse;

    if (cancelingPackageInCourse) {
      user.packageInCourse = null;
    } else {
      throw new Error('Package not found in user`s package in course');
    }

    const updatedPackage = await this.packageModel.findByIdAndUpdate(packageId, {
      status: 'created'
    });
    if (!updatedPackage) {
      throw new Error('Package not found');
    }
    user.save();
    return user;
  }

  async putPackageInCourse(body: PackageSingleStatusDto) {
    const { packageId, userId } = body;
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');

    if (user.packageInCourse) throw new Error('User already has package in course');

    const indexPendingPackage = user.packagesPending.indexOf(packageId);

    if (indexPendingPackage !== -1) {
      user.packagesPending.splice(indexPendingPackage, 1);
      user.packageInCourse = packageId;
    } else {
      throw new Error('Package not found in pending package of user');
    }

    const updatedPackage = await this.packageModel.findByIdAndUpdate(packageId, {
      status: 'in course'
    });

    if (!updatedPackage) {
      throw new Error('Package not found');
    }

    user.save();
    return;
  }

  async putPackageInDelivered(body: PackageSingleStatusDto) {
    const { packageId, userId } = body;
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');
    user.packageInCourse = null;

    const packageDelivered = await this.packageModel.findById(packageId).lean();
    if (!packageDelivered) {
      throw new Error('Package not found');
    }

    const bodyHistory: HistoryDto = { ...packageDelivered, status: 'delivered', userId: userId };
    const createHistory = await this.historyModel.create(bodyHistory);
    if (!createHistory) throw new Error('The package history was not created');

    const deletedPackage = await this.packageModel.findByIdAndDelete(packageId);
    if (!deletedPackage) throw new Error('Package not deleted');
    user.save();
    return;
  }

  async userIdHistory(userId: string) {
    const userHistory = await this.historyModel.find({ userId });
    if (!userHistory) throw new Error('History not found');
    return userHistory;
  }

  async packagePendingAndInCourse(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User not found');

    const arrPackagesId = user.packagesPending;
    if (user.packageInCourse) arrPackagesId.push(user.packageInCourse);

    //* Utilizar el método find para obtener documentos según los IDs en arrPackagesId
    const arrPackages = await this.packageModel.find({ _id: { $in: arrPackagesId } }).exec();
    const indexDocCreated = arrPackages.findIndex((el) => el.status === 'in course');

    if (indexDocCreated !== -1) {
      const docCreated = arrPackages.splice(indexDocCreated, 1)[0];

      return [docCreated, ...arrPackages];
    } else {
      return arrPackages;
    }
  }

  async lastSwornStatement({ id }: any) {
    const updatedUser = (await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: { lastSwornStatement: new Date(), isSuitable: false } },
      { new: true }
    )) as UserWithLastSwornStatement;

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  async packagesInfo(packageId: string) {
    const packageInfo = await this.packageModel.findById(packageId);

    if (!packageInfo) {
      throw new Error('Package not found');
    }
    return packageInfo;
  }
}
