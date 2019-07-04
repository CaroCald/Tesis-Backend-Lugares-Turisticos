import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Lugar_turisticoEntity} from "./lugar_turistico.entity";
import {UsuarioEntity} from "./usuario.entity";

@Entity("favoritos")
export class LugaresFavoritosEntity {
    @PrimaryColumn()
    id: number;


    @ManyToOne(
        () => Lugar_turisticoEntity,
        lugar => lugar.idfavoritos,
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