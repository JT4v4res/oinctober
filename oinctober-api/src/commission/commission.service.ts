import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Commission } from "./commission.entity";
import { Cliente } from "src/clientes/cliente.entity";

@Injectable()
export class CommissionService {
    constructor(
        @InjectRepository(Commission)
        private readonly commissionRepository: Repository<Commission>,
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>
    ){}

    async getAll(): Promise<Commission[]> {
        const commissions: Commission[] = await this.commissionRepository.find();

        if (commissions) {
            return commissions;
        }

        throw new HttpException("Nenhuma commission encontrada!", HttpStatus.NOT_FOUND);
    }

    async create(commission: Commission): Promise<Commission> {
        const cliente: Cliente = await this.clienteRepository.findOneBy({clientName: commission.commissionClientName})
    
        if (!cliente) {
            throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
        }

        cliente.comissionCount += 1;

        await this.clienteRepository.save(cliente);

        commission.cliente = cliente;

        await this.commissionRepository.save(await this.commissionRepository.create(commission));

        return commission;
    }

    async findByName(name: string): Promise<Commission> {
        const commission: Commission = await this.commissionRepository.findOneBy({commissionClientName: name});

        if (commission){
            return commission;
        }

        throw new HttpException("Nenhuma commission encontrada para esse cliente", HttpStatus.NOT_FOUND);
    }

    async update(commissionName: string, param: Partial<Commission>): Promise<Partial<Commission>> {
        const wasUpdated = await this.commissionRepository.update({commissionName: commissionName}, param);

        if (wasUpdated.affected > 0) {
            return param;
        }

        throw new HttpException("Não foi possível atualizar a commission", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async delete(name: string): Promise<Boolean> {
        const commission: Commission = await this.commissionRepository.findOneBy({commissionName: name});
        
        if (!commission) {
            throw new HttpException("Nenhuma commission com esse nome encontrada", HttpStatus.NOT_FOUND);
        }

        const wasDeleted = await this.commissionRepository.delete({commissionName: name});

        if (wasDeleted.affected > 0) {
            return true;
        }

        return false
    }
}