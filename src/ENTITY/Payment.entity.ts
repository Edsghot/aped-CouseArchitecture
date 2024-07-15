import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Payment")
export class PaymentEntity{
    @PrimaryGeneratedColumn()
    IdPayment: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    Dni: string;

    @Column()
    Sex: string;

    @Column()
    PhoneNumber: string;

    @Column()
    Mail: string;

    @Column()
    IdCourse: number;

    @Column()
    ImagePayment: string;
}