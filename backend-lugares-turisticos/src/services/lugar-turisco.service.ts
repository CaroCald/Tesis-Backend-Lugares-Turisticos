import {Injectable} from '@nestjs/common';
import {getManager, Repository} from 'typeorm';
import { diskStorage } from 'multer';
import {UsuarioEntity} from "../entities/usuario.entity";
import { InjectRepository } from '@nestjs/typeorm'
import * as crypto from "crypto";
import {Lugar_turisticoEntity} from "../entities/lugar_turistico.entity";
@Injectable()
export class LugarTuriscoService {

    constructor(

    ) { }

    /**
     * Metodo para insertar un nuevo registro
     * */
    async insert(entity: Lugar_turisticoEntity) {
        return getManager().insert(Lugar_turisticoEntity, entity);
    }

    /**
     * Metodo para obtener todos los registros de los usuarios almacenados en la BD.
     * */
    selectAll() {
        return getManager().find(Lugar_turisticoEntity);
    }

    /**
     * Metodo para obtener todos los datos de un usuario ingresando el id.
     * */
    selectById(id: number) {
        return getManager().findOne(Lugar_turisticoEntity, {
                id: id,
            },
        );
    }


    /**
     * Metodo para actualizar los registros de un usuario ingresando el id del mismo.
     * */

    update(id: number, newEntity: Lugar_turisticoEntity): any {
        return getManager().update(Lugar_turisticoEntity, id, newEntity);
    }


    /**
     * Metodo para eliminar los datos de un usuario ingresando el id.
     * */

    delete(id: number): any {
        return getManager().delete(Lugar_turisticoEntity, id);
    }

}