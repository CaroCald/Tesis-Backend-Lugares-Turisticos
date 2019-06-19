import {BadRequestException, Body, Controller, Post, Res} from "@nestjs/common";
import {JwtService} from "../services/jwt.service";
import {UsuarioEntity} from "../entities/usuario.entity";
import {UsuarioService} from "../services/usuario.service";

@Controller('Auth')
export class AuthController {
    constructor(private _jwtService: JwtService, private _usuarioService:UsuarioService){

    }
    @Post('emitir')
    async emitirToken(@Body('usuario') usuario){
        const enviarParametros= usuario;
        const usuarioBD = await this._usuarioService.selectPorAlias(usuario.alias) as UsuarioEntity;

        if(enviarParametros){
            const credencialesValidas = usuario.nick === usuarioBD.alias && usuario.password === usuarioBD.password;
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