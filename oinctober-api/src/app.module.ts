import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './clientes/cliente.module';
import { CommissionModule } from './commission/commission.module';
import { Cliente } from './clientes/cliente.entity';
import { Commission } from './commission/commission.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '5657',
      database: 'oinctober',
      entities: [Cliente, Commission], 
      synchronize: true,
    }), AuthModule, ClienteModule, CommissionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
