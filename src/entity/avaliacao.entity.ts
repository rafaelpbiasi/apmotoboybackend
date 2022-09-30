import {PrimaryGeneratedColumn, Column, Entity} from 'typeorm'

@Entity({name:"avaliacao"})
export class AvaliacaoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ })
    comentario: String;

    @Column({ })
    estrelas: Number;

    @Column({ })
    codperfilavaliado: Number;

    @Column({ })
    codusuarioavaliador: Number;
}