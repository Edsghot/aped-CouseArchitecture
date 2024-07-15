import { IsString, IsNumber } from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    FirstName: string;

    @IsString()
    LastName: string;

    @IsString()
    Dni: string;

    @IsString()
    Sex: string;

    @IsString()
    PhoneNumber: string;

    @IsString()
    Mail: string;

    @IsNumber()
    IdCourse: number;

    @IsString()
    ImagePayment: string;

    Valid: boolean;
}
