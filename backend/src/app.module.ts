import { Module } from '@nestjs/common';
import { databaseProviders } from './database/database.providers';
import { UserModule } from './user/user.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
