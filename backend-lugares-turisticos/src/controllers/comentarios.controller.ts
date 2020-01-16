import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards,} from '@nestjs/common';
import {diskStorage} from "multer";
import {RolesGuard} from "../guards/auth.guard";
import {FavoritosService} from "../services/favoritos.service";
import {PeticionNoValidaException} from "../exceptions/peticion-no-valida.exception";
import {ErrorIngresoDatosException} from "../exceptions/error-ingreso-datos.exception";
import {ComentariosService} from "../services/comentarios.service";

@UseGuards(RolesGuard)
@Controller('comentarios')
export class ComentariosController {

    constructor(private readonly _comentariosService: ComentariosService) {
    }

    @Post()
    create(@Body() nuevo, @Res() response) {
        return this._comentariosService.insert(nuevo)
            .then(()=> response.status(200).json(
                nuevo
            )).catch(
                err=> {
                    if(err){
                        throw new  ErrorIngresoDatosException(err.message,err.detail);
                    }
                }
            );
    }


    @Get()
    async findAll(@Res() response) {
        return response.send(await this._comentariosService.selectAll());
    }


    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this._comentariosService.selectById(id));
    }

    @Get('lista/:alias')
    async getAllData(@Param('alias') alias, @Res() response) {
        return response.send(await this._comentariosService.userData(alias));
    }


    @Put(':id')
    async update(@Param('id') id, @Body() nuevo) {

        var idEncontrado = await this._comentariosService.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Comentario no encontrado!!","El id del comentario aun no ha sido registrado");

        }else{
            return await this._comentariosService.update(id, nuevo);

        }
    }

    @Delete(':id')
    async remove(@Param('id') id) {

        var idEncontrado = await this._comentariosService.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Comentario no encontrado!!","El id del comentario aun no ha sido registrado");

        }else{
            return await this._comentariosService.delete(id);

        }
    }


}

