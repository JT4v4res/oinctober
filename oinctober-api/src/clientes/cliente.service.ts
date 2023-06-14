import { HttpException, HttpStatus, Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "./cliente.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>
    ) {}

    async findAll(): Promise<Cliente[]> {
        const clientes: Cliente[] = await this.clienteRepository.find();

        if (clientes) {
            return clientes;
        }

        throw new HttpException("Nenhum cliente encontrado", HttpStatus.NOT_FOUND);
    }

    async findByName(name: string): Promise<Cliente> {
        const cliente: Cliente = await this.clienteRepository.findOneBy({
            clientName: name,
        })

        if (cliente) {
            return cliente;
        }

        throw new HttpException("Cliente não encontrado!", HttpStatus.NOT_FOUND);
    }

    async logIn(email: string): Promise<Cliente> {
        const cliente: Cliente = await this.clienteRepository.findOneBy({
            email: email,
        })

        if (cliente) {
            return cliente;
        }

        throw new HttpException("Cliente não encontrado!", HttpStatus.NOT_FOUND);
    }

    async create(cliente: Cliente): Promise<Cliente> {
        const campoObrigatorio: Array<string> = ['clientName', 'email', 'phone', 'password', 'typeUser'];
        const camposEmFalta: Array<string> = [];

        campoObrigatorio.forEach(campo => {
            if (!cliente[campo]) {
                camposEmFalta.push(campo);
            }
        });

        if (camposEmFalta.length > 0) {
            throw new BadRequestException(`Campos obrigatórios não preenchidos ${camposEmFalta}`);
        }

        if (cliente.typeUser === "adm") {
            throw new HttpException("Você não tem permissão pra criar um novo ADMIN!", HttpStatus.UNAUTHORIZED);
        }

        const hashedPassword = await bcrypt.hash(cliente.password, 10);
        const newCliente: Cliente = await this.clienteRepository.create({
            clientName: cliente.clientName,
            email: cliente.email,
            phone: cliente.phone,
            password: hashedPassword,
            typeUser: cliente.typeUser,
        });

        await this.clienteRepository.save(newCliente);

        return newCliente;
    }

    async update(name: string, cliente: Partial<Cliente>): Promise<Partial<Cliente>> {
        if (cliente === null) {
            throw new BadRequestException("Não há dados para editar!");
        }

        if (cliente.typeUser === "admin") {
            throw new HttpException("Você não tem permissão para se tornar ADMIN", HttpStatus.UNAUTHORIZED);
        }

        const wasUpdated = await this.clienteRepository.update({clientName: name}, cliente);

        if (wasUpdated.affected > 0) {
            return cliente;
        }

        throw new HttpException("Não foi possível atualizar o registro", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async delete(name: string): Promise<boolean> {
        const wasDeleted = await this.clienteRepository.delete({clientName: name});

        if (wasDeleted.affected > 0) {
            return true;
        }

        return false;
    }

    async validateInfos(argument: string, param: string): Promise<Boolean> {
        if (argument === 'phone'){
            return await this.validatePhone(param);
        }

        if (argument === 'email'){
            return await this.validateEmail(param);
        }
    }

    async validatePhone(phone: string): Promise<Boolean> {
        const clientFound = await this.clienteRepository.findOneBy({phone: phone});

        if (clientFound){
            return false;
        }

        return true;
    }

    async validateEmail(email: string): Promise<Boolean> {
        const clientFound = await this.clienteRepository.findOneBy({email: email});

        if (clientFound) {
            return false;
        }

        return true;
    }

    async validatePassword(email: string, password: string): Promise<Boolean> {
        const clientFound = await this.clienteRepository.findOneBy({email: email});

        const isEqualPassword = await bcrypt.compare(password, clientFound.password);

        if (clientFound && isEqualPassword) {
            return true;
        }

        return false;
    }
}