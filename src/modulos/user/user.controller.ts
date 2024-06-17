import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/DTO/User/createUserDto.dto';
import { UpdateUserDto } from 'src/DTO/User/updateUserDto.dto';
import { UserService } from './user.service';
import { LoginDto } from 'src/DTO/User/LoginDto.dto';
import { validate } from 'class-validator';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('insert')
    async insertUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.insertUser(createUserDto);
    }

    @Put('update')
    async updateUser(@Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(updateUserDto);
    }

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get('/getById/:id')
    async getUserById(@Param('id') id: number) {
        return await this.userService.getUserById(id);
    }

    @Delete('/delete/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const errors = await validate(loginDto);
    
        if (errors.length > 0) {
            const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
        
            return {msg: "Error de datos de ingreso", detailMsg:errorMessage }
        }
        return await this.userService.login(loginDto.UserRequest, loginDto.Password);
    }
}
