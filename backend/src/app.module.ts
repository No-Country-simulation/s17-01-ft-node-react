import { Module } from '@nestjs/common';
import { databaseProviders } from './database/database.providers';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
