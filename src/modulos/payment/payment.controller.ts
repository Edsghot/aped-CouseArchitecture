import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FOLDER_PAYMENT } from 'src/Config/constantService';
import { PaymentService } from './payment.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePaymentDto } from 'src/DTO/Payment/createPaymentDto.dto';

@Controller('api/payment')
export class PaymentController {

    constructor (private paymentService: PaymentService,
        private cloudinaryService: CloudinaryService,){}

    @Post('/insertPayment')
    @UseInterceptors(FileInterceptor('file'))
    async insert(
      @Body() request: CreatePaymentDto,
      @UploadedFile() file?: Express.Multer.File){
        var res = await this.cloudinaryService.uploadFile(file, FOLDER_PAYMENT);

        request.ImagePayment = res.secure_url;

        return await this.paymentService.insertPayment(request);
    }
}
