import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {TipoLugarEntity} from "./tipo-lugar.entity";
import {LugaresFavoritosEntity} from "./favoritos.entity";
import {TipoDiscapacidadEntity} from "./tipo-discapacidad.entity";
import {ComentariosEntity} from "./comentarios.entity";

@Entity("lugar-turistico")
export class Lugar_turisticoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    nombre: string;

    @Column({ length: 2000})
    descripcionLugar: string;

    @Column({ length: 1000})
    precio?: string;

    @Column({ length: 1000})
    horario?: string;

    @Column({ length: 2000})
    descripcionAccesibilidad?: string;

    @Column({ length: 50})
    valoracion?: string;

    @Column({type: 'double precision'})
    latitud: number;

    @Column({type: 'double precision'})
    longitud: number;

    @Column({  nullable:true,length: 2000})
    foto_lugar: string;

    @Column({nullable: true})
    comentario?: string;

    @ManyToOne(
        type => TipoLugarEntity,
        tipo => tipo.lugar,

        {eager: true,}
    )
    @JoinColumn({name: "tipoLugar"})
    tipoLugar: TipoLugarEntity;

    @ManyToOne(
        type => TipoDiscapacidadEntity,
        tipodiscapacidad => tipodiscapacidad.tipoDiscapacidad,
        {eager: true}
    )
    @JoinColumn({name: "tipoDiscapacidad"})
    tipoDiscapacidad: TipoDiscapacidadEntity;

    @OneToMany(
        type => LugaresFavoritosEntity,
        lugar => lugar.idLugar
    )
    idfavoritos: LugaresFavoritosEntity[];


    @OneToMany(type => ComentariosEntity, comentario => comentario.idLugar)
    idComment: ComentariosEntity;

}