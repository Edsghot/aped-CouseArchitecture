import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @IsNumber()
    IdUser: number;

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
    PhoneNumber: string;

    @IsString()
    @IsNotEmpty()
    Dni: string;

    @IsNotEmpty()
    BirthDate: Date;


    @IsString()
    @IsNotEmpty()
    Mail: string;

    @IsNumber()
    Rol: number;
}