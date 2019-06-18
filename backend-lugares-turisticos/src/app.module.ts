import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthController} from "./controllers/auth.controller";
import {JwtService} from "./services/jwt.service";
import {UsuarioEntity} from "./entities/usuario.entity";
import {RolEntity} from "./entities/rol.entity";
import {UsuarioService} from "./services/usuario.service";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'root',
          database: 'lugares-turisticos',
          entities: [
              UsuarioEntity,
              RolEntity
          ],
          synchronize: true,
      }),
      TypeOrmModule.forFeature([

          UsuarioEntity,
          RolEntity
      ])
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtService, UsuarioService],
})
export class AppModule {}
