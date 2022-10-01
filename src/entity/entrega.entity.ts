import {PrimaryGeneratedColumn, Column, Entity, Double, OneToOne, JoinColumn} from 'typeorm'
import { ContratacaoEntity } from './contratacao.entity';

@Entity({name:"entrega"})
export class EntregaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    ruaorigem: String;

    @Column({ })
    numeroorigem: Number;

    @Column({ nullable: false })
    bairroorigem: String;

    @Column({  })
    referenciaorigem: String;

    @Column({ nullable: false })
    ruadestino: String;

    @Column({ nullable: false })
    numerodestino: Number;

    @Column({ nullable: false })
    bairrodestino: String;

    @Column({  })
    referenciadestino: String;

    @Column({ nullable: false })
    flagtipoveiculo: String;

    @Column({ type: "decimal" })
    valor: Number;

    @Column({ })
    LongitudeOrigem: Number;

    @Column({ })
    LatitudeOrigem: Number;

    @Column({ })
    LongitudeDestino: Number;

    @Column({ })
    LatitudeDestino: Number;

    @Column({  })
    item: String;

    @OneToOne(() => ContratacaoEntity, (contratacao) => contratacao.entrega)
    contratacao: ContratacaoEntity;

}