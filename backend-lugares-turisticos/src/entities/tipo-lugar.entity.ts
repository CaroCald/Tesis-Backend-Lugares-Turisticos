import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Lugar_turisticoEntity} from "./lugar_turistico.entity";


@Entity("tipo-lugar-turistico")
export class TipoLugarEntity {

    @PrimaryColumn()
    id: number;

    @Column({ length: 50})
    nombre: string;

    @OneToMany(type => Lugar_turisticoEntity, lugar => lugar.idLugar)
    lugar: Lugar_turisticoEntity[];


}