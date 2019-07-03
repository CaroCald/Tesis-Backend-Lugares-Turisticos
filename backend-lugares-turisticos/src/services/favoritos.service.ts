import {Injectable} from '@nestjs/common';
import {getManager, Repository} from 'typeorm';
import { diskStorage } from 'multer';
import {UsuarioEntity} from "../entities/usuario.entity";
import { InjectRepository } from '@nestjs/typeorm'
import * as crypto from "crypto";
import {Lugar_turisticoEntity} from "../entities/lugar_turistico.entity";
import {TipoLugarEntity} from "../entities/tipo-lugar.entity";
import {LugaresFavoritosEntity} from "../entities/favoritos.entity";
@Injectable()
export class FavoritosService {

    constructor(

    ) { }

    /**
     * Metodo para insertar un nuevo registro
     * */
    async insert(entity: LugaresFavoritosEntity) {
        return getManager().insert(LugaresFavoritosEntity, entity);
    }

    /**
     * Metodo para obtener todos los registros de los usuarios almacenados en la BD.
     * */
    selectAll() {
        return getManager().find(LugaresFavoritosEntity);
    }

    /**
     * Metodo para obtener todos los datos de un usuario ingresando el id.
     * */
    selectById(id: number) {
        return getManager().findOne(LugaresFavoritosEntity, {
                id: id,
            },
        );
    }


    /**
     * Metodo para actualizar los registros de un usuario ingresando el id del mismo.
     * */

    update(id: number, newEntity: LugaresFavoritosEntity): any {
        return getManager().update(LugaresFavoritosEntity, id, newEntity);
    }


    /**
     * Metodo para eliminar los datos de un usuario ingresando el id.
     * */

    delete(id: number): any {
        return getManager().delete(LugaresFavoritosEntity, id);
    }

}