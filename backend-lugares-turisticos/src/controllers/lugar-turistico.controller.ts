import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards,} from '@nestjs/common';
import {diskStorage} from "multer";
import {RolesGuard} from "../guards/auth.guard";
import {LugarTuriscoService} from "../services/lugar-turisco.service";
import {EntityPipe} from "../pipes/entity.pipe";
import {CommonSchema} from "../schemas/common.schema";

@UseGuards(RolesGuard)
@Controller('lugar-turistico')
export class LugarTuristicoController {

    constructor(private readonly _lugarService: LugarTuriscoService) {
    }

    @Post()
    create(@Body(new EntityPipe(CommonSchema.LUGAR_TURISTICO)) nuevo) {
        return this._lugarService.insert(nuevo);
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
        return await this._lugarService.update(id, nuevo);
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        return await this._lugarService.delete(id);
    }


}

