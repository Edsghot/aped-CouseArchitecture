import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ValidateService } from '../Validate/validate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/ENTITY/Payment.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity])
  ],
  providers: [PaymentService,CloudinaryService,ValidateService],
  controllers: [PaymentController],
})
export class PaymentModule {}
