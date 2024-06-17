import { Module } from '@nestjs/common';
import { UserModule } from './modulos/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './modulos/course/course.module';

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
}),UserModule, CourseModule],
  controllers: [],
  providers: [ ],
})
export class AppModule {}
