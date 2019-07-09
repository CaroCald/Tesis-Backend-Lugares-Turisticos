import {HttpException, HttpStatus} from "@nestjs/common";


export class PeticionNoValidaException extends  HttpException{

    constructor(private _mensaje, private _detalle){
        super(
            {
                mensaje:_mensaje,
                detalle:_detalle,
                status: HttpStatus.BAD_REQUEST
            },
            HttpStatus.BAD_REQUEST);

    }
}