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
  controllers: [AppController, AuthController, UsuarioController],
  providers: [AppService, JwtService, UsuarioService],
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LogMiddleware).forRoutes(
            { path: '*', method: RequestMethod.ALL }
        );

    }

}
