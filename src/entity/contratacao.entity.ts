import {PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, OneToOne} from 'typeorm'

import { UsuarioEntity } from './usuario.entity';
import { EntregaEntity } from './entrega.entity';

@Entity({name:"contratacao"})
export class ContratacaoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ })
    status: String;

    @OneToOne(() => EntregaEntity, {
        cascade: ["insert", "update", "remove"],
        onDelete: "CASCADE",
      })
      @JoinColumn({ name: "codentrega" })
      entrega: EntregaEntity;

    @ManyToOne((type) => UsuarioEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "codusuariocontratante" })
    contratante: UsuarioEntity;

    @ManyToOne((type) => UsuarioEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "codusuariocontratado" })
    contratado: UsuarioEntity;

}