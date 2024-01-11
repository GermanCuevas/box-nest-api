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

  // ? @Post()
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.create(createAdminDto);
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('deliveryDetails/:date')
  deliveryDetails(@Param('date') date: string) {
    return this.adminService.deliveryDetails(date);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('userDeliveryDetails/:date/:userId')
  userDeliveryDetails(
    @Param('userId', ParseMongoIdPipe) userId: string,
    @Param('date', DateValidationPipe) date: string
  ) {
    return this.adminService.deliveryDetailsUser(userId, date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
// ! administradores - repartos pendientes
