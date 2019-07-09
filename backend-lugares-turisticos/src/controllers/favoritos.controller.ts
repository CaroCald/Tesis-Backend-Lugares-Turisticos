import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards,} from '@nestjs/common';
import {diskStorage} from "multer";
import {RolesGuard} from "../guards/auth.guard";
import {FavoritosService} from "../services/favoritos.service";
import {PeticionNoValidaException} from "../exceptions/peticion-no-valida.exception";
import {ErrorIngresoDatosException} from "../exceptions/error-ingreso-datos.exception";

@UseGuards(RolesGuard)
@Controller('favoritos')
export class FavoritosController {

    constructor(private readonly _favoritosService: FavoritosService) {
    }

    @Post()
    create(@Body() nuevo, @Res() response) {
        return this._favoritosService.insert(nuevo)
            .then(()=> response.status(200).json(
            {
                data: nuevo
            }
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
        return response.send(await this._favoritosService.selectAll());
    }


    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this._favoritosService.selectById(id));
    }

    @Get('lista/:alias')
    async getAllData(@Param('alias') alias, @Res() response) {
        return response.send(await this._favoritosService.userData(alias));
    }


    @Put(':id')
    async update(@Param('id') id, @Body() nuevo) {

        var idEncontrado = await this._favoritosService.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Lugar favorito no encontrado!!","El id del lugar favortito aun no ha sido registrado");

        }else{
            return await this._favoritosService.update(id, nuevo);

        }
    }

    @Delete(':id')
    async remove(@Param('id') id) {

        var idEncontrado = await this._favoritosService.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Lugar favorito no encontrado!!","El id del lugar favortito aun no ha sido registrado");

        }else{
            return await this._favoritosService.delete(id);

        }
    }


}

