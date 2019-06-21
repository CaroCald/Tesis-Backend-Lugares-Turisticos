import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs/internal/Observable';
import {Reflector} from '@nestjs/core';
import {JwtService} from "../services/jwt.service";
import {UsuarioService} from "../services/usuario.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly _reflector: Reflector,
        private readonly _jwtService: JwtService,
        private readonly _usuarioService: UsuarioService,
    ) {
    }


    /**
     * Funcion para determinar si un usuario puede acceder a una ruta o no.
     * Se ha especificado un token al iniciar la sesion mismo que sera requerido para accerder a las demas rutas
     * Si el token es el especificado se permitira el acceso, de no ser asi no podrá acceder.
     * */
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        let jwtValue = request.headers['authorization'];
        if (!jwtValue) {
            return false;
        } else {
            jwtValue = jwtValue.replace('Bearer ', '');
            const resultToken = this._jwtService.verificarTokenSync(jwtValue);
            if (resultToken) {
                return this._usuarioService
                    .selectPorCorreo(resultToken.usuario.email)
                    .then((usuarioDB: any) => {
                        if (usuarioDB) {
                            if (usuarioDB.email === resultToken.usuario.email)
                            {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    });
            } else {
                return false;
            }
        }
    }
}