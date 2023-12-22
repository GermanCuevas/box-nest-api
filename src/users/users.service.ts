import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from 'src/packages/entities/package.entity';
import { Model } from 'mongoose';
import { AssignPackageUserDto } from './dto/assignPackage-user.dto';
import { User } from 'src/auth/entities/users.entity';
import { PackageSingleStatusDto } from './dto/packageSingleStatus.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Package.name)
    private packageModel: Model<Package>,
    @InjectModel(User.name)
    private userModel: Model<User>
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
        status: 'pending'
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

    const indexPendingPackage = user.packagesPending.indexOf(packageId);

    if (indexPendingPackage !== -1) {
      user.packagesPending.splice(indexPendingPackage, 1);
    } else {
      throw new Error('Package not found in pending package of user');
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
    const updatedPackage = await this.packageModel.findByIdAndUpdate(packageId, {
      status: 'delivered'
    });
    if (!updatedPackage) {
      throw new Error('Package not found');
    }
    user.save();
    return;
  }
}
