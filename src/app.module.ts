import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { RegisterModule } from './register/register.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/BigFive'),
    AuthModule,
    UsersModule,
    RegisterModule,
    PackagesModule
  ]
})
//sd
export class AppModule {}
