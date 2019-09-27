import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {Lugar_turisticoEntity} from "./lugar_turistico.entity";

@Entity("comentarios")
export class ComentariosEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    descripcion: string;


    @ManyToOne(
        () => Lugar_turisticoEntity,
        lugar => lugar.idComment,
        {eager: true}
    )
    @JoinColumn({name: "idLugar"})
    idLugar: Lugar_turisticoEntity;

    @ManyToOne(
        () => UsuarioEntity,
        usuario => usuario.idUser,
        {eager: true}
    )
    @JoinColumn({name: "idUsuario"})
    idUsuario: Lugar_turisticoEntity

}