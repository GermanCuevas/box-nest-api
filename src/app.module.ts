import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { RegisterModule } from './register/register.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/BigFive'),
    AuthModule,
    UsersModule,
    RegisterModule
  ]
})
export class AppModule {}
