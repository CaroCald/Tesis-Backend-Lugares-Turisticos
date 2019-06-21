import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from '@nestjs/common';
import {PeticionNoValidaException} from "../exceptions/peticion-no-valida.exception";

const Joi = require('joi');

@Injectable()
export class EntityPipe implements PipeTransform {

    constructor(private readonly _schema) {
    }

    transform(jsonToValidate: any, metadata: ArgumentMetadata) {
        const {
            error,
        } = Joi.validate(jsonToValidate, this._schema);
        if (error) {
            throw new  PeticionNoValidaException('Peticion Invalida!',error, 4);
        } else {
            return jsonToValidate;
        }
    }
}