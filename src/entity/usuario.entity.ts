import {PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn, ManyToOne} from 'typeorm'
import { AvaliacaoEntity } from './avaliacao.entity';
import { ContratacaoEntity } from './contratacao.entity';

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
    cpfcnpj: String;

    @Column({ nullable: false })
    flagtipousuario: String;

    @Column({ nullable: true })
    rua: String;

    @Column({ nullable: true })
    numero: string;

    @Column({ nullable: true })
    cep: string;

    @Column({ nullable: true })
    fotocnh: String;

    @Column({ nullable: false })
    flagconfirmatermos: String;

    @Column({ nullable: false, default: 'F' })
    flagverificado: String;

    @Column({ nullable: true,
      type: "decimal",
      precision: 7,
      scale: 2,
      default: 0,})
  mediaestrelas: number;

  @Column({ nullable: false })
  uuid: String;

    @OneToMany(() => ContratacaoEntity, (contratadas) => contratadas.contratante, {
        cascade: ["insert", "update", "remove"],
        onDelete: "CASCADE",
      })
      @JoinColumn({ name: "codusuariocontratante" })
      contratadas: ContratacaoEntity[];

      @OneToMany(() => ContratacaoEntity, (entregas) => entregas.contratado, {
        cascade: ["insert", "update", "remove"],
        onDelete: "CASCADE",
      })
      @JoinColumn({ name: "codusuariocontratado" })
      entregas: ContratacaoEntity[];

      @OneToMany(() => AvaliacaoEntity, (avaliacoesrecebidas) => avaliacoesrecebidas.perfilavaliado, {
        cascade: ["insert", "update", "remove"],
        onDelete: "CASCADE",
      })
      @JoinColumn({ name: "codperfilavaliado" })
      avaliacoesrecebidas: AvaliacaoEntity[];
      
      @OneToMany(() => AvaliacaoEntity, (avaliacoesrealizadas) => avaliacoesrealizadas.perfilavaliador, {
        cascade: ["insert", "update", "remove"],
        onDelete: "CASCADE",
      })
      @JoinColumn({ name: "codperfilavaliador" })
      avaliacoesrealizadas: AvaliacaoEntity[];


}