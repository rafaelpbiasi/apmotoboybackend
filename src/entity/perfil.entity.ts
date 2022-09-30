import {PrimaryGeneratedColumn, Column, Entity} from 'typeorm'

@Entity({name:"perfil"})
export class PerfilEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ })
    codusuario: Number;

    @Column({ })
    estrelas: Number;

    @Column({ })
    codavaliacao: Number;

}