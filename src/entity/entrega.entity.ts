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

    @Column({ nullable: false })
    ruadestino: String;

    @Column({ nullable: false })
    numerodestino: Number;

    @Column({ nullable: false })
    bairrodestino: String;

    @Column({ nullable: true,
        type: "decimal",
        precision: 7,
        scale: 2,
        default: 0,})
    valor: Number;

    @Column({ nullable: true })
    item: String;

    @Column({ nullable: true })
    estado: String;

    @Column({ nullable: true })
    cidade: String;

    @Column({ nullable: true })
    observacao: String;

    @OneToOne(() => ContratacaoEntity, (contratacao) => contratacao.entrega)
    contratacao: ContratacaoEntity;

}