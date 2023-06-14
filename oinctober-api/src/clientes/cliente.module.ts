import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from "./cliente.entity";
import { ClienteService } from "./cliente.service";
import { ClienteController, ValidateClientData } from "./cliente.controller";
import { Commission } from "src/commission/commission.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Cliente, Commission]),
    ],
    providers: [ClienteService],
    controllers: [ClienteController, ValidateClientData],
    exports: [TypeOrmModule, ClienteService],
})
export class ClienteModule{}