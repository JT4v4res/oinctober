import { ClienteService } from "src/clientes/cliente.service";
import { Injectable, UnauthorizedException, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from '@nestjs/passport';
import { Cliente } from "src/clientes/cliente.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly clienteService: ClienteService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(username: string): Promise<Cliente> {
        const user: Cliente = await this.clienteService.findByName(username);

        if (!user) {
            throw new UnauthorizedException('Usuário inválido!');
        }

        return user;
    }

    async login(user: Partial<Cliente>) {
        const validateClient = await this.clienteService.validatePassword(user.email, user.password);

        if (validateClient) {
            const userLog: Cliente = await this.clienteService.logIn(user.email)
            const payload = {username: userLog.clientName, sub: userLog.clienteId};
            const expiresIn: number = 21600;
            const expiresAt: Date = new Date();

            expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
            
            return {
                user: userLog.clientName,
                userType: userLog.typeUser,
                access_token: this.jwtService.sign(payload, {
                    secret: '367ac6c98160016d81ad7eca8aa7180310b911e34b055e8cf7d987e6cb2e4196',
                    expiresIn: expiresIn,
                }),
                expiresAt:expiresAt.toISOString(),
            }
        }
        
        throw new HttpException(`Login não realizado, senha ou email incorretos!`, HttpStatus.UNAUTHORIZED);
    }
}

@Injectable()
export class RolesAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly role: string) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const user = context.switchToHttp().getRequest().user;

        return user && user.role === this.role;
    }
}
