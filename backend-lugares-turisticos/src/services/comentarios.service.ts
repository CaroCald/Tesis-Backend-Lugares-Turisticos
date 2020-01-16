import {Injectable} from '@nestjs/common';
import {createQueryBuilder, getManager, Repository} from 'typeorm';
import { diskStorage } from 'multer';
import {UsuarioEntity} from "../entities/usuario.entity";
import { InjectRepository } from '@nestjs/typeorm'
import * as crypto from "crypto";
import {Lugar_turisticoEntity} from "../entities/lugar_turistico.entity";
import {TipoLugarEntity} from "../entities/tipo-lugar.entity";
import {LugaresFavoritosEntity} from "../entities/favoritos.entity";
import {ComentariosEntity} from "../entities/comentarios.entity";
@Injectable()
export class ComentariosService {

    constructor(

    ) { }

    /**
     * Metodo para insertar un nuevo registro
     * */
    async insert(entity: ComentariosEntity) {
        return getManager().insert(ComentariosEntity, entity);
    }

    /**
     * Metodo para obtener todos los registros de los usuarios almacenados en la BD.
     * */
    selectAll() {
        return getManager().find(ComentariosEntity);
    }

    /**
     * Metodo para obtener todos los datos de un usuario ingresando el id.
     * */
    selectById(id: number) {
        return getManager().findOne(ComentariosEntity, {
                id: id,
            },
        );
    }


    /**
     * Metodo para actualizar los registros de un usuario ingresando el id del mismo.
     * */

    update(id: number, newEntity: ComentariosEntity): any {
        return getManager().update(ComentariosEntity, id, newEntity);
    }


    /**
     * Metodo para eliminar los datos de un usuario ingresando el id.
     * */

    delete(id: number): any {
        return getManager().delete(ComentariosEntity, id);
    }

    /**Obtener todos los lugares favoritos de un usuario por su alias*/

    async userData(alias: any): Promise<any[]> {

        const user =  await createQueryBuilder(ComentariosEntity, "lugares")
            .innerJoinAndSelect("lugares.idLugar", "lugar")
            .innerJoinAndSelect("lugares.idUsuario", "usuario")
            .where("lugares.idUsuario=usuario.id")
            .andWhere("usuario.alias= '"+alias+"'")
            .getMany();

        return user

    }
}