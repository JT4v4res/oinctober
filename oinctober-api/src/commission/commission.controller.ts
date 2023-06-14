import { Controller, Body, Post, Get, Delete, Param, Patch, UseGuards } from "@nestjs/common/decorators";
import { CommissionService } from "./commission.service";
import { Commission } from "./commission.entity";
import { ApiOperation, ApiResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesAuthGuard } from "src/auth/auth.service";

@ApiTags('Commission')
@Controller('commission')
export class CommissionController {
    constructor(
        private readonly commissionService: CommissionService
    ){}

    @ApiOperation({ summary: 'Retorna uma lista com todas commissions', tags: ['get']})
    @ApiResponse({status: 200, description: 'Lista em JSON com as commissions encontradas.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado e não tenha privilégio \"ADM\", retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros retorna um NOT FOUND.'})
    @ApiOkResponse({type: [Commission]})
    @Get()
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard('adm'))
    async getAll(): Promise<Commission[]> {
        return await this.commissionService.getAll();
    }

    @ApiOperation({ summary: 'Retorna uma lista com todas commissions', tags: ['get']})
    @ApiResponse({status: 200, description: 'JSON com as commissions de um determinado cliente.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado e não possua privilégio de USER, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros retorna um NOT FOUND.'})
    @ApiOkResponse({type: [Commission]})
    @Get(':name')
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard('user'))
    async getByName(
        @Param('name') name: string
    ): Promise<Commission> {
        return await this.commissionService.findByName(name);
    }

    @ApiOperation({ summary: 'Cadastra um cliente, somente ADMINs podem criar novos ADMINs.', tags:['post']})
    @ApiResponse({status: 200, description: 'Cliente cadastrado com sucesso.'})
    @ApiResponse({status: 400, description: 'Caso os campos não obrigatórios sejam nulos, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado e não possua privilégio de USER, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @ApiOkResponse({type: [Commission]})
    @Post()
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard('user'))
    async create(
        @Body() commission: Commission
    ): Promise<Commission> {
        return await this.commissionService.create(commission);
    }

    @ApiOperation({summary: 'Atualiza um cliente.', tags: ['patch']})
    @ApiResponse({status: 200, description: 'Cliente atualizado com sucesso.'})
    @ApiResponse({status: 400, description: 'Caso o body não contenha nada, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @Patch(':name')
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard('adm'))
    async update(
        @Param('name') name: string,
        @Body() commission: Partial<Commission>
    ): Promise<Partial<Commission>> {
        return await this.commissionService.update(name, commission);
    }

    @ApiOperation({summary: 'Deleta um cliente, somente ADMINs podem apagar clientes.', tags: ['delete']})
    @ApiResponse({status: 200, description: 'Cliente atualizado com sucesso.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível apagar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @Delete(':name')
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard('adm'))
    async delete(
        @Param('name') name:string
    ): Promise<Boolean> {
        return await this.commissionService.delete(name);
    }
}