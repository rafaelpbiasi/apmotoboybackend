import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ContratacaoEntity } from "../entity/contratacao.entity";
import { EntregaEntity } from "../entity/entrega.entity";
import { UsuarioEntity } from "../entity/usuario.entity";

class ContratacaoController{
    public async findAll(req:Request, res:Response){
        try{
            const contratacoes = await getRepository(ContratacaoEntity).find()
            res.status(200).send({contratacoes});
        }catch (error) {
            res.status(500).send({ error});
        }
    }

    public async findByContratante(req:Request, res:Response){
        try{
            const idUsuario = req.params.id
            const usuario = await getRepository(UsuarioEntity).findOneBy({id: Number(idUsuario)})

            if(!usuario){
                res.status(404).send({error: "Usuário nao encontrado!"})
            }
          const contratacoes = await getRepository(ContratacaoEntity).createQueryBuilder("contratacoes")
        .leftJoinAndSelect("contratacoes.entrega", "entrega")
        .leftJoinAndSelect("contratacoes.contratante", "contratante")
        .leftJoinAndSelect("contratacoes.contratado", "contratado")
        .select("contratacoes", "id")
        .addSelect([
            "entrega",
            "contratante.id",
            "contratante.nome",
            "contratado.id",
            "contratado.nome",
        ])
        .where(
         `contratacoes.codusuariocontratante=${usuario.id}`
        )
        .getMany();
            
            res.status(200).send({contratacoes});
        }catch (error) {
            res.status(500).send({ error});
        }
    }
}
export default new ContratacaoController();