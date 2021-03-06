import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Lugar_turisticoEntity} from "./lugar_turistico.entity";


@Entity("tipo-discapacidad")
export class TipoDiscapacidadEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50})
    nombre: string;

    @OneToMany(
        type => Lugar_turisticoEntity,
        lugar => lugar.tipoDiscapacidad
    )
    tipoDiscapacidad: Lugar_turisticoEntity[];
}