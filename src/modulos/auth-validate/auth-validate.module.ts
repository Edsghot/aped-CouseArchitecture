import { Module } from '@nestjs/common';
import { AuthValidateService } from './auth-validate.service';
import { AuthValidateController } from './auth-validate.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MailerModule.forRoot(
      {
        transport: {
          service: 'gmail',
          auth:{
            user: 'edsghotsolutions@gmail.com',
            pass: 'utbrdntnpnttvumd'
          }
        }
      }
    )
  ],
  providers: [AuthValidateService],
  controllers: [AuthValidateController]
})
export class AuthValidateModule {}
