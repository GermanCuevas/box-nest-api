import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { RegisterModule } from './register/register.module';

@Module({
  imports: [AuthModule, UsersModule, RegisterModule]
})
export class AppModule {}
