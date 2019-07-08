import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthController} from "./controllers/auth.controller";
import {JwtService} from "./services/jwt.service";
import {UsuarioEntity} from "./entities/usuario.entity";
import {RolEntity} from "./entities/rol.entity";
import {UsuarioService} from "./services/usuario.service";
import {UsuarioController} from "./controllers/usuario.controller";
import {LogMiddleware} from "./middlewares/log.middleware";
import {TipoLugarEntity} from "./entities/tipo-lugar.entity";
import {Lugar_turisticoEntity} from "./entities/lugar_turistico.entity";
import {LugaresFavoritosEntity} from "./entities/favoritos.entity";
import {TipoLugarTuristicoController} from "./controllers/tipo-lugar-turistico.controller";
import {LugarTuristicoController} from "./controllers/lugar-turistico.controller";
import {FavoritosController} from "./controllers/favoritos.controller";
import {TipoLugarTuristicoService} from "./services/tipo-lugar-turistico.service";
import {LugarTuriscoService} from "./services/lugar-turisco.service";
import {FavoritosService} from "./services/favoritos.service";
import {TipoDiscapacidadEntity} from "./entities/tipo-discapacidad.entity";
import {TipoDiscapacidadController} from "./controllers/tipo-discapacidad.controller";
import {TipoDiscapacidadService} from "./services/tipo-discapacidad.service";

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
              RolEntity,
              TipoLugarEntity,
              Lugar_turisticoEntity,
              LugaresFavoritosEntity,
              TipoDiscapacidadEntity
          ],
          synchronize: true,
      }),
      TypeOrmModule.forFeature([

          UsuarioEntity,
          RolEntity,
          TipoLugarEntity,
          Lugar_turisticoEntity,
          LugaresFavoritosEntity,
          TipoDiscapacidadEntity
      ])
  ],
  controllers: [AppController,
      AuthController,
      UsuarioController,
      TipoLugarTuristicoController,
      LugarTuristicoController,
      TipoLugarTuristicoController,
      FavoritosController,
      TipoDiscapacidadController
  ],
  providers: [AppService,
      JwtService,
      UsuarioService,
      TipoLugarTuristicoService,
      LugarTuriscoService,
      FavoritosService,
      TipoDiscapacidadService
  ],
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LogMiddleware).forRoutes(
            { path: '*', method: RequestMethod.ALL }
        );

    }

}
