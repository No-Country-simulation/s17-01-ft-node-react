import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { planProvider } from './provider/plans.provider';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [DatabaseModule],
  providers: [PlansService, ...planProvider],
  controllers: [PlansController],
})
export class PlansModule {}
