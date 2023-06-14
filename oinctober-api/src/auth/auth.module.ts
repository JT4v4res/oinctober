import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./jwtStrategy.service";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService, RolesAuthGuard } from "./auth.service";
import { ClienteModule } from "src/clientes/cliente.module";

@Module({
    imports: [
        ClienteModule,
        PassportModule,
        JwtModule.register({
            secret: '367ac6c98160016d81ad7eca8aa7180310b911e34b055e8cf7d987e6cb2e4196',
            signOptions: {expiresIn: '6h'},
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtService, RolesAuthGuard],
    exports: [AuthService],
})
export class AuthModule{}