import {Injectable} from '@nestjs/common';
import {getManager, Repository} from 'typeorm';
import { diskStorage } from 'multer';
import {TipoLugarEntity} from "../entities/tipo-lugar.entity";
@Injectable()
export class TipoLugarTuristicoService {

    /**
     * Metodo para insertar un nuevo registro
     * */
    async insert(entity: TipoLugarEntity) {
        return getManager().insert(TipoLugarEntity, entity);
    }

    /**
     * Metodo para obtener todos los registros de los usuarios almacenados en la BD.
     * */
    selectAll() {
        return getManager().find(TipoLugarEntity);
    }

    /**
     * Metodo para obtener todos los datos de un usuario ingresando el id.
     * */
    selectById(id: number) {
        return getManager().findOne(TipoLugarEntity, {
                id: id,
            },
        );
    }


    /**
     * Metodo para actualizar los registros de un usuario ingresando el id del mismo.
     * */

    update(id: number, newEntity: TipoLugarEntity): any {
        return getManager().update(TipoLugarEntity, id, newEntity);
    }


    /**
     * Metodo para eliminar los datos de un usuario ingresando el id.
     * */

    delete(id: number): any {
        return getManager().delete(TipoLugarEntity, id);
    }

}