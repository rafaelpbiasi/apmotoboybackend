import {PrimaryGeneratedColumn, Column, Entity} from 'typeorm'

@Entity({name:"usuario"})
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome: String;

    @Column({ })
    telefone: String;

    @Column({ nullable: false })
    email: String;

    @Column({ nullable: false })
    senha: String;

    @Column({ nullable: false })
    confirmasenha: String;

    @Column({ nullable: false })
    cpfcnpj: String;

    @Column({ nullable: false })
    flagtipousuario: String;

    @Column({  })
    rua: String;

    @Column({  })
    numero: number;

    @Column({ nullable: false })
    cep: number;

    @Column({ nullable: false })
    flagtipoveiculo: String;

    @Column({ nullable: false })
    fotocnh: String;

    @Column({ nullable: false })
    flagconfirmatermos: String;
}