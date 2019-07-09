import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {TipoLugarEntity} from "./tipo-lugar.entity";
import {LugaresFavoritosEntity} from "./favoritos.entity";
import {TipoDiscapacidadEntity} from "./tipo-discapacidad.entity";

@Entity("lugar-turistico")
export class Lugar_turisticoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50})
    nombre: string;

    @Column({ length: 200})
    descripcionLugar: string;

    @Column({ length: 50})
    precio?: string;

    @Column({ length: 50})
    horario?: string;

    @Column({ length: 200})
    descripcionAccesibilidad?: string;

    @Column({ length: 50})
    valoracion?: string;

    @Column({type: 'double precision'})
    latitud: number;

    @Column({type: 'double precision'})
    longitud: number;

    @ManyToOne(
        type => TipoLugarEntity,
        tipo => tipo.lugar,
        {eager: true}
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

}