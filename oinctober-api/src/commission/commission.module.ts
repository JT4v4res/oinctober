import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Commission } from "./commission.entity";
import { CommissionService } from "./commission.service";
import { CommissionController } from "./commission.controller";
import { Cliente } from "src/clientes/cliente.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Commission, Cliente])],
    providers: [CommissionService],
    controllers: [CommissionController],
    exports: [TypeOrmModule],
})
export class CommissionModule {}