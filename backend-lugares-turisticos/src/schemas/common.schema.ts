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
            rol: joi.string().min(1).max(25)
        });

        static readonly AUTENTICACION_SCHEMA = joi
        .object()
        .keys({
            email: joi.string().email({ minDomainSegments: 2 }),
            password: joi.string().alphanum().min(3).max(32)
        });

    static readonly TIPO_LUGAR = joi
        .object()
        .keys({
            nombre: joi.string().min(2).max(80)

        });

    static readonly LUGAR_TURISTICO = joi
        .object()
        .keys({
            nombre: joi.string().min(2).max(80),
            descripcionLugar: joi.string().min(2).max(200),
            latitud: joi.number().required(),
            longitud: joi.number().required(),
            precio: joi.string().allow(null),
            horario: joi.string().allow(null),
            descripcionAccesibilidad :joi.string().allow(null),
            valoracion:joi.string().allow(null),
            foto_lugar:joi.string().allow(null),
            tipoDiscapacidad:joi.number().required(),
            tipoLugar: joi.number().required(),
        });
}
