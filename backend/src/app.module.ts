import { Module } from '@nestjs/common';
import { databaseProviders } from './database/database.providers';
import { UserModule } from './user/user.module';
import { PlansModule } from './plans/plans.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [UserModule, PlansModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
