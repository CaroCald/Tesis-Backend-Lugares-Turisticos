import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {UsuarioEntity} from "./usuario.entity";

@Entity("rol")
export class RolEntity {
    @PrimaryColumn()
    codigo: string;

    @Column({name: 'nombre', length: 50})
    nombre: string;

    @Column({name: 'descripcion', length: 50})
    descripcion: string;


    @OneToMany(
        () => UsuarioEntity,
        usuario => usuario.rol,
    )
    usuario: UsuarioEntity;
}