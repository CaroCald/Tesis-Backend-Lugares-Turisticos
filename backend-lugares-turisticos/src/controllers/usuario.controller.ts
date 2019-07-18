import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import {extname} from "path";
import {diskStorage} from "multer";
import {UsuarioService} from "../services/usuario.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {CommonSchema} from "../schemas/common.schema";
import {EntityPipe} from "../pipes/entity.pipe";
import {RolesGuard} from "../guards/auth.guard";
import {ErrorIngresoDatosException} from "../exceptions/error-ingreso-datos.exception";


@Controller('usuario')
export class UsuarioController {

    constructor(private readonly _usuarioService: UsuarioService) {
    }

    @Post()
    create(@Body(new EntityPipe(CommonSchema.USUARIO_SCHEMA)) crearUsuario,@Res() response) {
        return this._usuarioService.insert(crearUsuario)
            .then(()=> response.status(200).json(
                crearUsuario))
            .catch(err=> {
                if(err){
                    throw new  ErrorIngresoDatosException(err.message,err.detail);
                }
        })
    }

    @UseGuards(RolesGuard)
    @Get()
    async findAll(@Res() response) {
        return response.send(await this._usuarioService.selectAll());
    }
    @UseGuards(RolesGuard)
    @Get(':correo')
    async findOneNick(@Param('correo') correo, @Res() response) {
        return response.send(await this._usuarioService.selectPorCorreo(correo));
    }


    @UseGuards(RolesGuard)
    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this._usuarioService.selectById(id));
    }


    @UseGuards(RolesGuard)
    @Put(':id')
    async update(@Param('id') id, @Body() nuevo) {
        var idEncontrado = await this._usuarioService.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Usuario no encontrado!!","El id del usuario aun no ha sido registrado");

        }else{
            return await this._usuarioService.update(id, nuevo);

        }
    }

    @UseGuards(RolesGuard)
    @Delete(':id')
    async remove(@Param('id') id) {
        var idEncontrado = await this._usuarioService.selectById(id);
        if(idEncontrado==undefined){
            throw new  ErrorIngresoDatosException("Usuario no encontrado!!","El id del usuario aun no ha sido registrado");

        }else{
            return await this._usuarioService.delete(id);

        }
    }


    @Post('upload-image')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: function (req, file, cb) {
                const fs = require('fs');
                const dir = `./public/users/`;
                if (!fs.existsSync('./public')) {
                    fs.mkdirSync('./public');
                    fs.mkdirSync('./public/users/');
                    fs.mkdirSync(dir);
                } else if (!fs.existsSync('./public/users/')) {
                    fs.mkdirSync('./public/users/');
                    fs.mkdirSync(dir);
                } else if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                } else {
                }
                cb(null, dir)
            },
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`)
            },
        }),
        limits: {fileSize: 10485760},
        fileFilter: function fileFilter(req, file, cb) {
            const filetypes = /jpeg|jpg|png/;
            const mimetype = filetypes.test(file.mimetype);
            const extname2 = filetypes.test(extname(file.originalname).toLowerCase());

            if (mimetype && extname2) {
                return cb(null, true);
            } else {
                // cb(new Error('¡Formato de imagen no soportado!'), false);
                cb(null, false);
            }
        }
    }))
    async uploadImage(@UploadedFile() file) {
        if (file) {

            return {
                response: '¡Imagen guardada con éxito!',
                imagePath: `${file.destination}/${file.filename}`.replace('./public/users/', ''),
            };

        } else {
            throw new HttpException('¡Elija una imagen!', HttpStatus.BAD_REQUEST);
        }
    }


    @UseGuards(RolesGuard)
    @Get('buscarFoto/:archivo')
    async findFile(@Res() response, @Param('archivo') archivo){
        var foto =response.sendFile(`users/${archivo}`,{root: 'public'});
        if(foto){
            return  foto;
        }else{
            throw new  ErrorIngresoDatosException("Foto no encontrada","Asegurese de ingresar el nombre correcto de la fotografia");

        }


    }

}

