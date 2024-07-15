import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from 'src/ENTITY/Payment.entity';
import { ValidateService } from '../Validate/validate.service';
import { CreatePaymentDto } from 'src/DTO/Payment/createPaymentDto.dto';
import { AuthValidateService } from '../auth-validate/auth-validate.service';
import {  resPaymentDto } from 'src/DTO/Payment/resPaymentDto.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    private readonly validateService: ValidateService,
    private mailValidateService: AuthValidateService
  ) {}

  async insertPayment(request: CreatePaymentDto) {
    try {
      // Validate DNI
      let validationResponse = await this.validateService.validateDni(request.Dni);
      if (!validationResponse.success) {
        return { msg: validationResponse.msg, success: validationResponse.success, data: null };
      }

      // Validate Phone Number
      validationResponse = await this.validateService.validatePhoneNumber(request.PhoneNumber);
      if (!validationResponse.success) {
        return { msg: validationResponse.msg, success: validationResponse.success, data: null };
      }

      // Validate First Name
      validationResponse = await this.validateService.validateFirstName(request.FirstName);
      if (!validationResponse.success) {
        return { msg: validationResponse.msg, success: validationResponse.success, data: null };
      }

      // Validate Last Name
      validationResponse = await this.validateService.validateLastName(request.LastName);
      if (!validationResponse.success) {
        return { msg: validationResponse.msg, success: validationResponse.success, data: null };
      }

      await this.mailValidateService.sendMailUser(request);
      request.Valid = false;
      const newPayment = this.paymentRepository.create(request);
      await this.paymentRepository.save(newPayment);

      return { msg: 'Pago insertado exitosamente', success: true };
    } catch (error) {
      console.error('Error al insertar pago:', error);
      return { msg: 'Error al insertar pago', detailMsg: error.message, success: false };
    }
  }

  async AcceptPayment(request: resPaymentDto) {
    try {

        var payment = await this.paymentRepository.findOne({where:{IdCourse: request.IdCourse,Dni: request.Dni}});

        if(!payment){
            return{msg: "error del payment"}
        }

        var res = new CreatePaymentDto();
            res.Mail = payment.Mail,
        
      await this.mailValidateService.sendPaymentSuccess(res);

      return { msg: 'Pago insertado exitosamente', success: true };
    } catch (error) {
      console.error('Error al insertar pago:', error);
      return { msg: 'Error al insertar pago', detailMsg: error.message, success: false };
    }
  }
}
