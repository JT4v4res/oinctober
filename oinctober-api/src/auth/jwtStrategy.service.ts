import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Cliente } from "src/clientes/cliente.entity";

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '367ac6c98160016d81ad7eca8aa7180310b911e34b055e8cf7d987e6cb2e4196',
        });
    }

    async validate(payload: JwtPayload): Promise<Cliente> {
        const { username } = payload;
        
        return await this.authService.validateUser(username);
    }
}