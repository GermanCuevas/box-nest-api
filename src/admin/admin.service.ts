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
import { deliveryCodeGenerator } from 'src/utils/deliveryCodeGenerator';

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
      let deliveryCode = deliveryCodeGenerator();
      while (await this.packagesModel.findOne({ deliveryCode: deliveryCode })) {
        deliveryCode = deliveryCodeGenerator();
      }

      createPackageDto.deliveryCode = deliveryCode;
      createPackageDto.hiddenHistory = false;
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
  async deliveryDetailsUser(userId: string) {
    const packagesDelivered = await this.historyModel.find({ userId });
    if (!packagesDelivered) throw new Error('Package not found');

    return packagesDelivered;
  }

  async deliveryDetails(selectedDate: string) {
    console.log(selectedDate);
    //TODO: Traer dependiendo si selectedDate es mayor o igual (>=) a assignedDate de packages
    //TODO: Mostrar los paquetes que son distintos a status: created
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    // $lt: endOfDay

    const packages = await this.packagesModel.find({
      status: { $ne: 'created' },
      assignedDate: {
        $lt: endOfDay
      }
    });

    const packagesDelivered = await this.historyModel
      .find({ deliveriedDate: { $gte: startOfDay } })
      .populate('userId');

    const totalPackages = [...packages, ...packagesDelivered];
    const users = await this.userModel.find();
    //y bueno, aqui se hace la magia
    //TODO: Hacer un top de usuarios con mas repartos
    //* Cochinadas de Ivan
    const objTopPackages: TopPackages = {};
    //! Es para sacar el top de users con mas repartos
    packagesDelivered.forEach(({ userId }) => {
      //* para que reconozca la estructura de un populate usar el unknowm
      //* unknown es un tipo que representa un valor desconocido. Es más seguro que any ya que requiere una verificación de tipo explícita antes de ser utilizado.

      const infoUser = userId as unknown as UserInternal;

      if (infoUser) {
        if (!objTopPackages[infoUser.email]) objTopPackages[infoUser.email] = {};
        if (!objTopPackages[infoUser.email]['recoveried']) {
          objTopPackages[infoUser.email]['recoveried'] = 0;
        }
        objTopPackages[infoUser.email]['recoveried']++;
        objTopPackages[infoUser.email]['image'] = infoUser.imgAvatar;
      }
    });
    const usersAbles = users.filter((user) => !user.isDisabled);
    const sortedEntries = Object.entries(objTopPackages)
      .sort((a, b) => b[1].recoveried - a[1].recoveried)
      .map((x) => ({ email: x[0], imageUrl: x[1].image, deliveredNum: x[1].recoveried }));

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

  async getAllUsers() {
    const users = await this.userModel.find();
    if (!users) throw new Error('Users not found');
    return users;
  }

  async getDeliveredPackagesByDate(date: string) {
    // Convierte la cadena de fecha a un objeto Date
    const startOfDay = new Date(date);

    // Establece la hora a las 00:00:00 del día seleccionado
    startOfDay.setHours(0, 0, 0, 0);

    // Calcula la fecha del siguiente día para obtener el rango completo del día seleccionado
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    const packages = await this.historyModel.find({
      deliveriedDate: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    console.log(packages);

    if (!packages || packages.length === 0) {
      throw new Error('Packages not found');
    }

    return { deliveredPackages: packages, totalDeliveredPackages: packages.length };
  }

  async getDeliveryUsers() {
    const users = await this.userModel.find();
    const usersDelivery = await Promise.all(
      users
        .map(async (e) => {
          if (!e.isAdmin) {
            const oneHistory = await this.historyModel.find({ userId: e.id });
            const totalPackages =
              e.packagesPending.length + (e.packageInCourse ? 1 : 0) + oneHistory.length;
            let percentage = oneHistory.length / totalPackages;
            const percentageFixed = Number(percentage.toFixed(2));
            percentage = percentageFixed * 10;
            if (isNaN(percentage)) {
              percentage = 0;
            }
            let status: string;
            if (e.isDisabled) {
              status = 'DESHABILITADO';
            } else {
              if (percentage === 100) {
                status = 'COMPLETADO';
              } else if (percentage === 0) {
                status = 'INACTIVO';
              } else {
                status = 'EN CURSO';
              }
            }

            return {
              id: e._id,
              name: e.name,
              status,
              percentage
            };
          } else {
            return null;
          }
        })
        .filter((user) => user !== null)
    );

    if (!users) throw new Error('Users not found');
    return usersDelivery;
  }

  async toggleHiddenHistoryAdmin(id: string) {
    let packageToToggle: any;
    packageToToggle = await this.historyModel.findById(id);
    if (!packageToToggle) {
      packageToToggle = await this.packagesModel.findById(id);
    }
    if (!packageToToggle) throw new Error('Package not found');
    packageToToggle.hiddenHistory = !packageToToggle.hiddenHistory;
    await packageToToggle.save();
    return packageToToggle;
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
