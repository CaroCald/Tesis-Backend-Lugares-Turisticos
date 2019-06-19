const joi = require('joi');

export class CommonSchema {
    static readonly USUARIO_SCHEMA = joi
        .object()
        .keys({
            nombre: joi.string().min(2).max(30),
            apellido: joi.string().min(2).max(30),
            email: joi.string().email({ minDomainSegments: 2 }),
            alias: joi.string().min(4).max(30),
            password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            foto_usuario: joi.string().allow(null),
            rol: joi.string().min(2).max(25)
        });

        static readonly AUTENTICACION_SCHEMA = joi
        .object()
        .keys({
            email: joi.string().email({ minDomainSegments: 2 }),
            password: joi.string().alphanum().min(3).max(32)
        });

}
