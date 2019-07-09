import {Injectable} from '@nestjs/common';
import {getManager, Repository} from 'typeorm';
import { diskStorage } from 'multer';
import {UsuarioEntity} from "../entities/usuario.entity";
import { InjectRepository } from '@nestjs/typeorm'
import * as crypto from "crypto";
@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private userRepository: Repository<UsuarioEntity>,
    ) { }

    /**
     * Metodo para insertar un nuevo usuario en la BD.
     * Se guarda la contraseña encriptada con sha256 en la BD.
     * */
    async insert(user: UsuarioEntity): Promise<UsuarioEntity> {
        user.password = crypto.createHmac('sha256', user.password).digest('hex');
        return await this.userRepository.save(user)
    }

    /**
     * Metodo para obtener todos los registros de los usuarios almacenados en la BD.
     * */
    selectAll() {
        return getManager().find(UsuarioEntity );
    }

    /**
     * Metodo para obtener todos los datos de un usuario ingresando el id.
     * */
    selectById(id: number) {
        return getManager().findOne(UsuarioEntity, {
                id: id,
            },
        );
    }

    /**
     * Metodo para obtener todos los datos de un usuario ingresando el correo electronico.
     * */

    selectPorCorreo(email: string) {
        return getManager().findOne(UsuarioEntity, {
                email: email,
            },
        );
    }
    /**
     * Metodo para actualizar los registros de un usuario ingresando el id del mismo.
     * */

    update(id: number, newEntity: UsuarioEntity): any {
        return getManager().update(UsuarioEntity, id, newEntity);
    }


    /**
     * Metodo para eliminar los datos de un usuario ingresando el id.
     * */

    delete(id: number): any {
        return getManager().delete(UsuarioEntity, id);
    }

}