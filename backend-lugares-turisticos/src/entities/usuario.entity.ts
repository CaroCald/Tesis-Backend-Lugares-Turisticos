import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {RolEntity} from "./rol.entity";
import {Lugar_turisticoEntity} from "./lugar_turistico.entity";
import {LugaresFavoritosEntity} from "./favoritos.entity";

@Unique(['alias'])
@Entity("usuario")
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({length: 30})
    nombre: string;

    @Column({length: 30})
    apellido: string;

    @Column()
    email: string;

    @Column({length: 30})
    alias: string;

    @Column()
    password: string;

    @Column({name: 'foto_usuario'})
    foto_usuario?: string;

    @Column({nullable: true})
    discapacidad?: boolean;

    @ManyToOne(
        () => RolEntity,
        rol => rol.usuario,
        {eager: true},
    )
    @JoinColumn({name: 'codigo_rol_fk'})
    rol: RolEntity | string;


    @OneToMany(type => LugaresFavoritosEntity, lugar => lugar.idUsuario)
    idUser: LugaresFavoritosEntity;
}
