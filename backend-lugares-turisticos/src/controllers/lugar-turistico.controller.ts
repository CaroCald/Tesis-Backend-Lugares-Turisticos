import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards,} from '@nestjs/common';
import {diskStorage} from "multer";
import {RolesGuard} from "../guards/auth.guard";
import {LugarTuriscoService} from "../services/lugar-turisco.service";
import {EntityPipe} from "../pipes/entity.pipe";
import {CommonSchema} from "../schemas/common.schema";
import {ErrorIngresoDatosException} from "../exceptions/error-ingreso-datos.exception";

@UseGuards(RolesGuard)
@Controller('lugar-turistico')
export class LugarTuristicoController {

    constructor(private readonly _lugarService: LugarTuriscoService) {
    }

    @Post()
    create(@Body(new EntityPipe(CommonSchema.LUGAR_TURISTICO)) nuevo, @Res() response) {
        return this._lugarService.insert(nuevo)
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
        return response.send(await this._lugarService.selectAll());
    }


    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this._lugarService.selectById(id));
    }
    @Put(':id')
    async update(@Param('id') id, @Body() nuevo) {
        var idEncontrado = await this._lugarService.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Lugar turistico no encontrado!!","El id del lugar turistico aun no ha sido registrado");

        }else{
            return await this._lugarService.update(id, nuevo);

        }
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        var idEncontrado = await this._lugarService.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Lugar turistico no encontrado!!","El id del lugar turistico aun no ha sido registrado");

        }else{
            return await this._lugarService.delete(id);


        }
    }


}

