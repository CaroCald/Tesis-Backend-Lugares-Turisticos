import {Injectable} from "@nestjs/common";
const jwtPaquete= require('jsonwebtoken');
@Injectable()
export class JwtService{
    private readonly  jwt = jwtPaquete;
    private readonly secreto= 'Tengo que acabar la tesis';
    private  readonly opciones={
        expiresIn: '1d'
    };
    emitirToken(payload:any){

        return this.jwt.sign(payload, this.secreto, this.opciones);
    }


    verificarTokenASync(token:string, callback){
        return this.jwt.verify(token, this.secreto, callback)
    }
}