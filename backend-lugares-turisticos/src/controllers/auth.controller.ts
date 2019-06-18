import {BadRequestException, Body, Controller, Post} from "@nestjs/common";
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

            const credencialesValidas = usuario.nick === usuarioBD.alias && usuario.password === usuarioBD.password

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
    verificarTokeAsyn(@Body('jwt') jwt){
        const enviarParametos=jwt;
        if(enviarParametos){
            this._jwtService.verificarTokenASync(jwt, (error, datos)=>{
                if(error){
                    throw new  BadRequestException({
                        mensaje: 'Token Invalido',
                        error: error
                    });
                }
            })

        }else{
            throw new BadRequestException({
                mensaje:'No envia parametros'
            })
        }
    }
}