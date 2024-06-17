import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { CreateUserDto } from 'src/DTO/User/createUserDto.dto';
import { UpdateUserDto } from 'src/DTO/User/updateUserDto.dto';
import { UserEntity } from 'src/ENTITY/User.entity';
import { Repository } from 'typeorm';
import { ValidateService } from '../Validate/validate.service';

@Injectable()
export class UserService {
  code: number;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private validateService: ValidateService,
  ) {
    this.code = 0;
  }

  async insertUser(request: CreateUserDto) {
    try {
      let band: { success: boolean, msg: string };
      band = await this.validateService.validateDni(request.Dni);
      
      if (!band.success) {
        return { msg: band.msg, success: band.success, data: null };
      }
  
      band = await this.validateService.validatePhoneNumber(request.PhoneNumber);
      
      if (!band.success) {
        return { msg: band.msg, success: band.success, data: null };
      }
  
      band = await this.validateService.validateFirstName(request.FirstName);
      
      if (!band.success) {
        return { msg: band.msg, success: band.success, data: null };
      }
  
      band = await this.validateService.validateLastName(request.LastName);
  
      if (!band.success) {
        return { msg: band.msg, success: band.success, data: null };
      }
  
      const userDni = await this.userRepository.findOne({ where: { Dni: request.Dni } });
  
      if (userDni) {
        return { msg: "Ya se registró un usuario con ese DNI", success: false, data: null };
      }
  
      const newUser = this.userRepository.create({
        FirstName: request.FirstName,
        Sex: request.Sex,
        LastName: request.LastName,
        Password: request.Password,
        BirthDate: request.BirthDate,
        PhoneNumber: request.PhoneNumber,
        Dni: request.Dni,
        Mail: request.Mail,
        Rol: request.Rol,
      });
  
      // Guardar la nueva entidad de usuario en la base de datos
      await this.userRepository.save(newUser);
  
      return { msg: 'Usuario insertado exitosamente', success: true };
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      return { msg: 'Error al insertar usuario', detailMsg: error, success: false };
    }
  }
  
  async updateUser(updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { IdUser: updateUserDto.IdUser },
      });
      if (!user) {
        return { msg: 'Usuario no encontrado', success: false };
      }
  
      user.FirstName = updateUserDto.FirstName;
      user.LastName = updateUserDto.LastName;
      user.Password = updateUserDto.Password;
      user.PhoneNumber = updateUserDto.PhoneNumber;
      user.BirthDate = updateUserDto.BirthDate;
      user.Dni = updateUserDto.Dni;
      user.Sex = updateUserDto.Sex;
      user.Mail = updateUserDto.Mail;
      user.Rol = updateUserDto.Rol;
  
      await this.userRepository.save(user);
  
      return { msg: 'Usuario actualizado exitosamente', success: true };
    } catch (error) {
      return { msg: 'Error al actualizar usuario', detailMsg: error, success: false };
    }
  }
  
  async getAllUsers() {
    try {
      const users = await this.userRepository.find();
      return { data: users, msg: 'Éxito', success: true };
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return { msg: 'Error al obtener usuarios', detailMsg: error, success: false };
    }
  }
  
  async deleteUser(userId: number) {
    try {
      await this.userRepository.delete(userId);
      return { msg: 'Usuario eliminado exitosamente', success: true };
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      return { msg: 'Error al eliminar usuario', detailMsg: error, success: false };
    }
  }
  
  async getUserById(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { IdUser: userId },
      });
      return { data: user, msg: 'Éxito', success: true };
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      return { msg: 'Error al obtener usuario', detailMsg: error, success: false };
    }
  }
  
  async login(userRequest: string, password: string) {
    try {
      let userRes;
      userRes = await this.userRepository.findOne({
        where: { Mail: userRequest, Password: password },
      });
  
      if (!userRes) {
        userRes = await this.userRepository.findOne({
          where: { Dni: userRequest, Password: password },
        });
  
        if (!userRes) {
          return {
            data: null,
            msg: 'Usuario o contraseña incorrectos',
            success: false,
          };
        }
      }
  
      return { data: userRes, msg: 'Éxito', success: true };
    } catch (error) {
      return { msg: 'Error al iniciar sesión', detailMsg: error, success: false };
    }
  }
  
}
