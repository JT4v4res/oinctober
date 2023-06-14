import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from 'class-validator';
import { Commission } from "src/commission/commission.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    clienteId: number;

    @Column({ nullable: false })
    clientName: string;

    @Column({ unique: true, nullable: false })
    @IsEmail()
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ unique: true, nullable: false})
    phone: string;

    @Column({ nullable: true })
    comissionCount: number;

    @Column({ nullable: false })
    typeUser: string;

    @OneToMany(() => Commission, commission => commission.cliente)
    commission: Commission[]
}