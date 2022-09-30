import {PrimaryGeneratedColumn, Column, Entity, Double} from 'typeorm'

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

    @Column({  })
    valor: Double;

}