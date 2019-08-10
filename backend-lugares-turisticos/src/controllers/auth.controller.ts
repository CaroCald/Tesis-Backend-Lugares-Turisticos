import {BadRequestException, Body, Controller, Get, Param, Post, Res} from "@nestjs/common";
import {JwtService} from "../services/jwt.service";
import {UsuarioEntity} from "../entities/usuario.entity";
import {UsuarioService} from "../services/usuario.service";
import {EntityPipe} from "../pipes/entity.pipe";
import {CommonSchema} from "../schemas/common.schema";
import * as crypto from "crypto";
import {AES, enc} from "crypto-ts";

@Controller('autenticacion')
export class AuthController {
    constructor(private _jwtService: JwtService, private _usuarioService:UsuarioService){

    }

    /**
    * Metodo post para emitir el jwt, verifica las credenciales ingresadas por el usuario
    * y las compara con las de la base de datos, si es correcto obtiene el token para iniciar
    * sesion.
    * La contraseña se compara con el hash de la misma almacenada en la BD.
    * */
    @Post()
    async emitirToken(@Body(new EntityPipe(CommonSchema.AUTENTICACION_SCHEMA)) usuario){
        const enviarParametros= usuario;
        const usuarioBD = await this._usuarioService.selectPorCorreo(usuario.email) as UsuarioEntity;
        if(usuarioBD){
            if(enviarParametros){
                const passwordDos = AES.decrypt(usuarioBD.password,'tesis').toString(enc.Utf8);
                const credencialesValidas = usuario.email === usuarioBD.email && passwordDos === usuario.password;
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
                            mensaje: 'Las Credenciales son inválidas vuelva a intentar.'
                        }
                    )
                }
            }else
            {
                throw new BadRequestException({
                    mensaje:'Ingrese todos los parametros'
                })
            }
        }else{
            throw new BadRequestException({
                mensaje:'Las Credenciales son inválidas vuelva a intentar'
            })
        }

    }

     @Post("password")
    async desencriptarContraseña(@Body('password') password, @Res() response){
        var ejem = AES.decrypt(password,'tesis').toString(enc.Utf8);
     
        return response.send({
            password:ejem
        });


    }


}