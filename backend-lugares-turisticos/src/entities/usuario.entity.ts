import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {RolEntity} from "./rol.entity";
import * as crypto from 'crypto';

@Unique(['alias'])
@Entity("usuario")
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({length: 30})
    nombre: string;

    @Column({length: 30})
    apellido: string;

    @Column()
    email: string;

    @Column({length: 30})
    alias: string;

    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
    @Column()
    password: string;

    @Column({name: 'foto_usuario'})
    foto_usuario?: string;

    @ManyToOne(
        () => RolEntity,
        rol => rol.usuario,
        {eager: true},
    )
    @JoinColumn({name: 'codigo_rol_fk'})
    rol: RolEntity | string;


}
