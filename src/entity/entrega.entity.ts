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

    @Column({ nullable: true })
    referenciaorigem: String;

    @Column({ nullable: false })
    ruadestino: String;

    @Column({ nullable: false })
    numerodestino: Number;

    @Column({ nullable: false })
    bairrodestino: String;

    @Column({ nullable: true })
    referenciadestino: String;

    @Column({ nullable: false })
    flagtipoveiculo: String;

    @Column({ nullable: true,
        type: "decimal",
        precision: 7,
        scale: 2,
        default: 0,})
    valor: Number;

    @Column({ nullable: true })
    LongitudeOrigem: Number;

    @Column({ nullable: true })
    LatitudeOrigem: Number;

    @Column({ nullable: true })
    LongitudeDestino: Number;

    @Column({ nullable: true })
    LatitudeDestino: Number;

    @Column({ nullable: true })
    item: String;

    @Column({ nullable: true })
    estado: String;

    @Column({ nullable: true })
    cidade: String;

    @OneToOne(() => ContratacaoEntity, (contratacao) => contratacao.entrega)
    contratacao: ContratacaoEntity;

}