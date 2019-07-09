import {Injectable} from '@nestjs/common';
import {getManager, Repository} from 'typeorm';
import { diskStorage } from 'multer';
import {UsuarioEntity} from "../entities/usuario.entity";
import { InjectRepository } from '@nestjs/typeorm'
import * as crypto from "crypto";
import {Lugar_turisticoEntity} from "../entities/lugar_turistico.entity";
import {TipoDiscapacidadEntity} from "../entities/tipo-discapacidad.entity";
@Injectable()
export class TipoDiscapacidadService {

    constructor(

    ) { }

    /**
     * Metodo para insertar un nuevo registro
     * */
    async insert(entity: TipoDiscapacidadEntity) {
        return getManager().insert(TipoDiscapacidadEntity, entity);
    }

    /**
     * Metodo para obtener todos los registros de los usuarios almacenados en la BD.
     * */
    selectAll() {
        return getManager().find(TipoDiscapacidadEntity);
    }

    /**
     * Metodo para obtener todos los datos de un usuario ingresando el id.
     * */
    selectById(id: number) {
        return getManager().findOne(TipoDiscapacidadEntity, {
                id: id,
            },
        );
    }


    /**
     * Metodo para actualizar los registros de un usuario ingresando el id del mismo.
     * */

    update(id: number, newEntity: TipoDiscapacidadEntity): any {
        return getManager().update(TipoDiscapacidadEntity, id, newEntity);
    }


    /**
     * Metodo para eliminar los datos de un usuario ingresando el id.
     * */

    delete(id: number): any {
        return getManager().delete(TipoDiscapacidadEntity, id);
    }

}