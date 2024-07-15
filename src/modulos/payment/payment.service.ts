import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from 'src/ENTITY/Payment.entity';
import { ValidateService } from '../Validate/validate.service';
import { CreatePaymentDto } from 'src/DTO/Payment/createPaymentDto.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    private readonly validateService: ValidateService,
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

      // Check if payment with same DNI already exists
      const existingPayment = await this.paymentRepository.findOne({ where: { Dni: request.Dni } });
      if (existingPayment) {
        return { msg: 'Ya se registró un pago con ese DNI', success: false, data: null };
      }

      // Create and save the new payment entity
      const newPayment = this.paymentRepository.create(request);
      await this.paymentRepository.save(newPayment);

      return { msg: 'Pago insertado exitosamente', success: true };
    } catch (error) {
      console.error('Error al insertar pago:', error);
      return { msg: 'Error al insertar pago', detailMsg: error.message, success: false };
    }
  }
}
