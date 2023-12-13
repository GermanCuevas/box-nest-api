import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PackagesModule } from './packages/packages.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb:27017/BigFive'), AuthModule, PackagesModule]
})
//sd
export class AppModule {}
