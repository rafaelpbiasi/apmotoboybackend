import {PrimaryGeneratedColumn, Column, Entity} from 'typeorm'

import { UsuarioEntity } from './usuario.entity';
import { EntregaEntity } from './entrega.entity';

@Entity({name:"contratacao"})
export class ContratacaoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ })
    codentrega: Number;

    @Column({ })
    codusuariocontratante: Number;

    @Column({ })
    codusuariocontratado: Number;

    @Column({ })
    status: String;

    @Column({ })
    codperfilcontratante: Number;

    @Column({ })
    codperfilcontratado: Number;

}