import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards,} from '@nestjs/common';
import {diskStorage} from "multer";
import {RolesGuard} from "../guards/auth.guard";
import {TipoLugarTuristicoService} from "../services/tipo-lugar-turistico.service";
import {EntityPipe} from "../pipes/entity.pipe";
import {CommonSchema} from "../schemas/common.schema";
import {ErrorIngresoDatosException} from "../exceptions/error-ingreso-datos.exception";

@UseGuards(RolesGuard)
@Controller('tipo-lugar-turistico')
export class TipoLugarTuristicoController {

    constructor(private readonly _tipoLugarService: TipoLugarTuristicoService) {
    }

    @Post()
    create(@Body(new EntityPipe(CommonSchema.TIPO_LUGAR)) nuevo,  @Res() response) {
        return this._tipoLugarService.insert(nuevo)
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
        return response.send(await this._tipoLugarService.selectAll());
    }


    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this._tipoLugarService.selectById(id));
    }
    @Put(':id')
    async update(@Param('id') id, @Body() nuevo) {
        var idEncontrado = await this._tipoLugarService.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Tipo de lugar no encontrado!!","El id del tipo del lugar aun no ha sido registrado");

        }else{
            return await this._tipoLugarService.update(id, nuevo);

        }
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        var idEncontrado = await this._tipoLugarService.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Tipo de lugar no encontrado!!","El id del tipo del lugar aun no ha sido registrado");

        }else{
            return await this._tipoLugarService.delete(id);


        }
    }


}

