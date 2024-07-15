import { Module } from '@nestjs/common';
import { UserModule } from './modulos/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './modulos/course/course.module';
import { PaymentModule } from './modulos/payment/payment.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthValidateModule } from './modulos/auth-validate/auth-validate.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'ccontrolz.com',
    port: 3306,
    username: 'nibcqvah_edsghot',
    password: 'Repro123.',
    database: 'nibcqvah_CourseArchitecture',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}),UserModule, CourseModule,CloudinaryModule, PaymentModule,AuthValidateModule],
  controllers: [],
  providers: [CloudinaryService],
})
export class AppModule {}
