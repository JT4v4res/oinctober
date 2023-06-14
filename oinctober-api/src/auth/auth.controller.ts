import { Controller, Post, Body } from '@nestjs/common';
import { Cliente } from 'src/clientes/cliente.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(
        @Body() param: Cliente
    ){
        return this.authService.login(param);
    }
}