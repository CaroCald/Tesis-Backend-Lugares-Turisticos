import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Lugar_turisticoEntity} from "./lugar_turistico.entity";


@Entity("tipo-lugar-turistico")
export class TipoLugarEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50})
    nombre: string;

    @OneToMany(type => Lugar_turisticoEntity, lugar => lugar.tipoLugar)
    lugar: Lugar_turisticoEntity[];


}