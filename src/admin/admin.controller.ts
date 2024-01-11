import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Public } from 'src/common/guards/auth.guard';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
import { UpdateUserStatusDto } from './dto/update-userStatus.dto';
import { DeliveredAdminDto } from './dto/delivered-admin-dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { DateValidationPipe } from 'src/common/pipes/date-validation.pipe';

import { BadRequest } from 'src/common/exceptions/exceptions';
import { InternalServerErrorException } from '@nestjs/common';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('addPackage')
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.adminService.addPackage(createPackageDto);
  }

  @Public()
  @Patch('updateUserStatus/:id')
  updateUserStatus(@Param('id') id: string, @Body() updateUserStatusDto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(id, updateUserStatusDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('deliveryDetails/:date')
  deliveryDetails(@Param('date', DateValidationPipe) date: string) {
    return this.adminService.deliveryDetails(date);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('userDeliveryDetails/:userId')
  async userDeliveryDetails(@Param('userId', ParseMongoIdPipe) userId: string) {
    try {
      return await this.adminService.deliveryDetailsUser(userId);
    } catch (error) {
      switch (error) {
        case 'Package not found':
          throw new BadRequest();
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('users')
  getAllUsers() {
    try {
      return this.adminService.getAllUsers();
    } catch (error) {
      switch (error) {
        case 'Users not found':
          throw new BadRequest();
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('deliveredPackagesByDate/:date')
  getDeliveredPackagesByDate(@Param('date', DateValidationPipe) date: string) {
    try {
      return this.adminService.getDeliveredPackagesByDate(date);
    } catch (error) {
      switch (error) {
        case 'Packages not found':
          throw new BadRequest();
        default:
          throw new InternalServerErrorException();
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
// ! administradores - repartos pendientes
