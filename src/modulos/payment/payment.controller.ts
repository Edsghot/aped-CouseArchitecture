import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FOLDER_PAYMENT } from 'src/Config/constantService';
import { PaymentService } from './payment.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePaymentDto } from 'src/DTO/Payment/createPaymentDto.dto';
import { resPaymentDto } from 'src/DTO/Payment/resPaymentDto.dto';
import { Response } from 'express';

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

    @Get('/acceptPayment/:IdCourse/:Dni')
    async success(@Param() params: resPaymentDto) {
        return await this.paymentService.AcceptPayment(params);
    }

    @Get('/failPayment/:IdCourse/:Dni')
    async Fail(@Param() params: resPaymentDto) {
        return await this.paymentService.AcceptPayment(params);
    }

    @Get('/whatsApp/:idCourse/:Dni')
     async WhatsApp(@Param() params: { idCourse: number, Dni: string }, @Res() res: Response) {
            const { idCourse, Dni } = params;
            const message = `Curso ID: ${idCourse}, DNI: ${Dni}. Aquí está la imagen: `;
            const phoneNumber = '51983805438'; // Número de teléfono en formato internacional
            const imageUrl = 'https://res.cloudinary.com/dbdfy2iui/image/upload/v1721004351/Xnor/Payment/jhzl2cjulcheltc2p0xi.jpg'; // URL de la imagen
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message + imageUrl)}`;
    
            return res.redirect(whatsappUrl);
        }
}
