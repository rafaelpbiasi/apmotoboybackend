import {PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import { UsuarioEntity } from './usuario.entity';

@Entity({name:"avaliacao"})
export class AvaliacaoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ })
    comentario: String;

    @ManyToOne((type) => UsuarioEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "codperfilavaliado" })
    perfilavaliado: UsuarioEntity;

    @ManyToOne((type) => UsuarioEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "codperfilavaliador" })
    perfilavaliador: UsuarioEntity;
}