import { Cliente } from 'src/clientes/cliente.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Commission {
    @PrimaryGeneratedColumn()
    commissionId: number;

    @Column({ nullable: false })
    @JoinColumn({ referencedColumnName: 'clientName' })
    commissionClientName: string;

    @Column({ nullable: false })
    commissionName: string;

    @Column({ nullable: false })
    commissionTotalValue: number;

    @Column({ nullable: false })
    commissionPaidValue: number;

    @Column({ nullable: false })
    commissionStartDate: Date;

    @Column({ nullable: false })
    commissionStatus: string;

    @ManyToOne(() => Cliente, cliente => cliente.commission)
    cliente: Cliente;
}