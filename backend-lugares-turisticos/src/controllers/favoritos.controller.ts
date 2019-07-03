import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards,} from '@nestjs/common';
import {diskStorage} from "multer";
import {RolesGuard} from "../guards/auth.guard";
import {FavoritosService} from "../services/favoritos.service";

@UseGuards(RolesGuard)
@Controller('favoritos')
export class FavoritosController {

    constructor(private readonly _favoritosService: FavoritosService) {
    }

    @Post()
    create(@Body() nuevo) {
        return this._favoritosService.insert(nuevo);
    }


    @Get()
    async findAll(@Res() response) {
        return response.send(await this._favoritosService.selectAll());
    }


    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this._favoritosService.selectById(id));
    }
    @Put(':id')
    async update(@Param('id') id, @Body() nuevo) {
        return await this._favoritosService.update(id, nuevo);
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        return await this._favoritosService.delete(id);
    }


}

