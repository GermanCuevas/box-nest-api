import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PackagesModule } from './packages/packages.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/BigFive'),
    AuthModule,
    PackagesModule,
    AdminModule,
    UsersModule,
    HistoryModule
  ]
})
//sd
export class AppModule {}
