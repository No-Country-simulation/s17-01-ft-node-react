import { Module } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { ComponentsController } from './components.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { UserModule } from 'src/user/user.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { PlansModule } from 'src/plans/plans.module';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Plan } from 'src/plans/entities/plan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Component, User, Category, Plan]), UserModule
  ],
  controllers: [ComponentsController],
  providers: [ComponentsService],
})
export class ComponentsModule {}
