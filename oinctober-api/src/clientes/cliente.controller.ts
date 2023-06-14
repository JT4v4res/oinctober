import { Controller, Body, Post, Get, Param, Patch, Delete, UseGuards } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { Cliente } from "./cliente.entity";
import { RolesAuthGuard } from "src/auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiResponse, ApiOperation, ApiOkResponse } from '@nestjs/swagger'; 

@Controller('clientes')
export class ClienteController {
    constructor(
        private readonly clienteService: ClienteService
    ){}
    
    @ApiOperation({ summary: 'Retorna uma lista com todos os clientes cadastrados, somente ADMINs podem acessar.', tags: ['get']})
    @ApiResponse({status: 200, description: 'Lista em JSON com os clientes encontrados.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado e não possua privilégio de ADMIN, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'caso não sejam encontrados registros retorna um NOT FOUND.'})
    @ApiOkResponse({type: [Cliente]})
    @Get()
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard('adm'))
    async findAll(): Promise<Cliente[]> {
        return await this.clienteService.findAll();
    }

    @ApiOperation({ summary: 'Retorna uma lista com todos os clientes cadastrados, somente ADMINs podem acessar.', tags: ['get']})
    @ApiResponse({status: 200, description: 'JSON com os dados do cliente solicitado.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado e não possua privilégio de USER, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'caso não sejam encontrados registros retorna um NOT FOUND.'})
    @ApiOkResponse({type: [Cliente]})
    @Get(':name')
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard('user'))
    async findByName(
        @Param('name') name: string
    ): Promise<Cliente> {
        return await this.clienteService.findByName(name);
    }

    @ApiOperation({ summary: 'Cadastra um cliente.', tags:['post']})
    @ApiResponse({status: 200, description: 'Cliente cadastrado com sucesso.'})
    @ApiResponse({status: 400, description: 'Caso os campos não obrigatóris sejam nulos, retorna um BAD REQUEST.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @Post()
    async create(
        @Body() cliente: Cliente
    ): Promise<Cliente> {
        return await this.clienteService.create(cliente);
    }

    @ApiOperation({summary: 'Atualiza um cliente.', tags: ['patch']})
    @ApiResponse({status: 200, description: 'Cliente atualizado com sucesso.'})
    @ApiResponse({status: 400, description: 'Caso o body não contenha nada, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado e não tenha privilégios de ADMIN, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @Patch(':name')
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard('adm'))
    async update(
        @Param('name') name: string,
        @Body() cliente: Cliente
    ): Promise<Partial<Cliente>> {
        return await this.clienteService.update(name, cliente);
    }

    @ApiOperation({summary: 'Deleta um cliente.', tags: ['delete']})
    @ApiResponse({status: 200, description: 'Cliente atualizado com sucesso.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado e não tenha privilégio de ADMIN, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @Delete(':name')
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard('adm'))
    async delete(
        @Param('name') name: string
    ): Promise<boolean> {
        return await this.clienteService.delete(name);
    }
}

@Controller('validate')
export class ValidateClientData {
    constructor(
        private readonly clienteService: ClienteService
    ){}

    @Get(':argument/:param')
    async validatePhoneMail(
        @Param('argument') argument: string,
        @Param('param') param: string
    ): Promise<Boolean> {
        return await this.clienteService.validateInfos(argument, param);
    }
}