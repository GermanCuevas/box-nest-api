import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RegisterModule,
    MongooseModule.forRoot('mongodb://localhost:27017/box-mongodb')
  ]
})
export class AppModule {}
