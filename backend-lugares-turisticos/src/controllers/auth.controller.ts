import {BadRequestException, Body, Controller, Post, Res} from "@nestjs/common";
import {JwtService} from "../services/jwt.service";
import {UsuarioEntity} from "../entities/usuario.entity";
import {UsuarioService} from "../services/usuario.service";
import {EntityPipe} from "../pipes/entity.pipe";
import {CommonSchema} from "../schemas/common.schema";

@Controller('autenticacion')
export class AuthController {
    constructor(private _jwtService: JwtService, private _usuarioService:UsuarioService){

    }
    @Post()
    async emitirToken(@Body(new EntityPipe(CommonSchema.AUTENTICACION_SCHEMA)) usuario){
        const enviarParametros= usuario;
        const usuarioBD = await this._usuarioService.selectPorCorreo(usuario.email) as UsuarioEntity;
        if(enviarParametros){
            const credencialesValidas = usuario.email === usuarioBD.email && usuario.password === usuarioBD.password;
            if(credencialesValidas){
                return {
                    jwt: this._jwtService.emitirToken({
                        usuario:usuario
                    })
                };
            }
            else{
                throw new BadRequestException(
                    {
                        mensaje: 'credenciales invalidas'
                    }
                )
            }
        }else
        {
            throw new BadRequestException({
                mensaje:'No envia parametros'
            })
        }
    }

    @Post('verificarAsync')
    async verificarJWT(@Body('jwt') jwt: string, @Res() res) {
        if (jwt) {
            this._jwtService.verificarTokenASync(jwt, (error, data) => {
                if (!error)
                    return res.send(data);
                else
                    throw new BadRequestException({
                        mensaje: '¡JWT inválido!',
                        error: error,
                    });
            });
        } else {
            throw new BadRequestException({
                mensaje: '¡No envía jwt!',
            });
        }
    }
}