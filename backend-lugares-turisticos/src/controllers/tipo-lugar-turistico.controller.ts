import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards,} from '@nestjs/common';
import {diskStorage} from "multer";
import {RolesGuard} from "../guards/auth.guard";
import {TipoLugarTuristicoService} from "../services/tipo-lugar-turistico.service";

@UseGuards(RolesGuard)
@Controller('tipo-lugar-turistico')
export class TipoLugarTuristicoController {

    constructor(private readonly _tipoLugarService: TipoLugarTuristicoService) {
    }

    @Post()
    create(@Body() nuevo) {
        return this._tipoLugarService.insert(nuevo);
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
        return await this._tipoLugarService.update(id, nuevo);
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        return await this._tipoLugarService.delete(id);
    }


}

