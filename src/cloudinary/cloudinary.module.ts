// src/cloudinary/cloudinary.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryProvider],
  exports: [CloudinaryProvider],
})
export class CloudinaryModule {}
