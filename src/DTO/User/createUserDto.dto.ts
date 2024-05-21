import { IsString, IsNotEmpty, IsNumber, IsEmail } from "class-validator";

// create-user.dto.ts
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    FirstName: string;

    @IsString()
    @IsNotEmpty()
    LastName: string;

    @IsString()
    @IsNotEmpty()
    Password: string;

    @IsString()
    @IsNotEmpty()
    Sex: string;

    @IsString()
    @IsNotEmpty()
    Dni: string;

    @IsString()
    @IsNotEmpty()
    PhoneNumber: string;

    @IsNotEmpty()
    BirthDate: Date;

    @IsEmail()
    @IsNotEmpty()
    Mail: string;

    @IsNumber()
    Rol: number;

}