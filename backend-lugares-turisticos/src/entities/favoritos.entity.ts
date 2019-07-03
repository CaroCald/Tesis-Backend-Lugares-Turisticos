import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Lugar_turisticoEntity} from "./lugar_turistico.entity";
import {UsuarioEntity} from "./usuario.entity";

@Entity("favoritos")
export class LugaresFavoritosEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(type => Lugar_turisticoEntity, lugar => lugar.idfavoritos)
    @JoinColumn({name: "idLugar"})
    idLugar: Lugar_turisticoEntity;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.idUser)
    @JoinColumn({name: "idUsuario"})
    idUsuario: Lugar_turisticoEntity;
}