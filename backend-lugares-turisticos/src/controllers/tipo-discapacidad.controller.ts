import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards,} from '@nestjs/common';
import {diskStorage} from "multer";
import {RolesGuard} from "../guards/auth.guard";
import {TipoDiscapacidadService} from "../services/tipo-discapacidad.service";
import {ErrorIngresoDatosException} from "../exceptions/error-ingreso-datos.exception";


@UseGuards(RolesGuard)
@Controller('tipo-discapacidad')
export class TipoDiscapacidadController {

    constructor(private readonly _tipoDiscap: TipoDiscapacidadService) {
    }

    @Post()
    create(@Body() nuevo,  @Res() response) {
        return this._tipoDiscap.insert(nuevo)
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
        return response.send(await this._tipoDiscap.selectAll());
    }


    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this._tipoDiscap.selectById(id));
    }
    @Put(':id')
    async update(@Param('id') id, @Body() nuevo) {

        var idEncontrado = await this._tipoDiscap.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Tipo de discapacidad no encontrado!!","El id del tipo de discapacidad aun no ha sido registrado");

        }else{
            return await this._tipoDiscap.update(id, nuevo);

        }

    }

    @Delete(':id')
    async remove(@Param('id') id) {
        var idEncontrado = await this._tipoDiscap.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Tipo de discapacidad no encontrado!!","El id del tipo de discapacidad aun no ha sido registrado");

        }else{
            return await this._tipoDiscap.delete(id);
        }
    }


}

