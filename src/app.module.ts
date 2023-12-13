import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PackagesModule } from './packages/packages.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/BigFive'),
    AuthModule,
    PackagesModule,
    AdminModule,
    UsersModule
  ]
})
//sd
export class AppModule {}
