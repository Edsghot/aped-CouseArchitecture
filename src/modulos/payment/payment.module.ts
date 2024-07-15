import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ValidateService } from '../Validate/validate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/ENTITY/Payment.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthValidateService } from '../auth-validate/auth-validate.service';
import { CourseEntity } from 'src/ENTITY/Course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity]),TypeOrmModule.forFeature([CourseEntity])
  ],
  providers: [PaymentService,CloudinaryService,ValidateService,AuthValidateService],
  controllers: [PaymentController],
})
export class PaymentModule {}
