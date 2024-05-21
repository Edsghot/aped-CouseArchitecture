import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity("User")
export class UserEntity {
    @PrimaryGeneratedColumn()
    IdUser: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    Password: string;

    @Column()
    Dni: string;

    @Column()
    BirthDate: Date;

    @Column()
    Sex: string;

    @Column()
    PhoneNumber: string;

    @Column()
    Mail: string;

    @Column()
    Rol: number;
}