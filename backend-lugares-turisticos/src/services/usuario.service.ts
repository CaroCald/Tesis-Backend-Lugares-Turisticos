import {BadRequestException, Injectable} from '@nestjs/common';
import {getManager} from 'typeorm';
import { diskStorage } from 'multer';
import {UsuarioEntity} from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {

    async insert(entity: UsuarioEntity) {
        const usuario = await this.selectPorAlias(entity.alias);
        if (usuario) {
            throw new BadRequestException({
                mensaje: `¡El alias ${entity.alias} ya se encuentra registrado, intente con otro!`,
            });
        } else {
            return getManager().insert(UsuarioEntity, entity);
        }
    }

    selectAll() {
        return getManager().find(UsuarioEntity);
    }

    selectById(id: number) {
        return getManager().findOne(UsuarioEntity, {
                id: id,
            },
        );
    }

    selectPorAlias(alias: string) {
        return getManager().findOne(UsuarioEntity, {
                alias: alias,
            },
        );
    }


    update(id: number, newEntity: UsuarioEntity): any {
        return getManager().update(UsuarioEntity, id, newEntity);
    }


    delete(id: number): any {
        return getManager().delete(UsuarioEntity, id);
    }

}