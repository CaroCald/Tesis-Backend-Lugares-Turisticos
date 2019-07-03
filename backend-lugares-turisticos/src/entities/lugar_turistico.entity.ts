import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {TipoLugarEntity} from "./tipo-lugar.entity";
import {LugaresFavoritosEntity} from "./favoritos.entity";

@Entity("lugar-turistico")
export class Lugar_turisticoEntity {

    @PrimaryColumn()
    id: number;

    @Column({ length: 50})
    nombre: string;

    @Column({ length: 50})
    descripcion: string;

    @Column({ length: 50})
    precio: string;

    @Column({ length: 50})
    horario: string;

    @Column({ length: 50})
    accesibilidad: string;

    @Column({ length: 50})
    valoracion: string;

    @ManyToOne(type => TipoLugarEntity, tipo => tipo.lugar)
    @JoinColumn({name: "idLugar"})
    idLugar: TipoLugarEntity;

    @OneToMany(type => LugaresFavoritosEntity, lugar => lugar.idLugar)
    idfavoritos: LugaresFavoritosEntity[];

}