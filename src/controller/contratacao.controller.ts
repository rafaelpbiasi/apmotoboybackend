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

    public async findByMotoboy(req:Request, res:Response){
        try{
            const idUsuario = req.params.id
            const usuario = await getRepository(UsuarioEntity).findOneBy({id: Number(idUsuario)})
            
            if(!usuario){
                res.status(404).send({error: "Usuário nao encontrado!"})
            }
          const contratacoesMotoboy = await getRepository(ContratacaoEntity).createQueryBuilder("contratacoesmotoboy")
        .leftJoinAndSelect("contratacoesmotoboy.entrega", "entrega")
        .leftJoinAndSelect("contratacoesmotoboy.contratante", "contratante")
        .leftJoinAndSelect("contratacoesmotoboy.contratado", "contratado")
        .select("contratacoesmotoboy", "id")
        .addSelect([
            "entrega",
            "contratante.id",
            "contratante.nome",
            "contratado.id",
            "contratado.nome",
        ])
        .where(
         `contratacoesmotoboy.codusuariocontratado=${usuario.id}`
        )
        .getMany();
            
            res.status(200).send({contratacoesMotoboy});
        }catch (error) {
            res.status(500).send({ error});
        }
    }

    public async findByEntrega(req:Request, res:Response){
        try{
            
          const contratacoesEntrega = await getRepository(ContratacaoEntity).createQueryBuilder("contratacoesentrega")
        .leftJoinAndSelect("contratacoesentrega.entrega", "entrega")
        .leftJoinAndSelect("contratacoesentrega.contratante", "contratante")
        .leftJoinAndSelect("contratacoesentrega.contratado", "contratado")
        .select("contratacoesentrega", "id")
        .addSelect([
            "entrega",
            "contratante.id",
            "contratante.nome",
            "contratado.id",
            "contratado.nome",
        ])
        .getMany();
            
            res.status(200).send({contratacoesEntrega});
        }catch (error) {
            res.status(500).send({ error});
        }
    }

    public async findByMotoboys(req:Request, res:Response){
        try{
            
          const contratacoesMotoboys = await getRepository(ContratacaoEntity).createQueryBuilder("contratacoesmotoboys")
        .leftJoinAndSelect("contratacoesmotoboys.entrega", "entrega")
        .leftJoinAndSelect("contratacoesmotoboys.contratante", "contratante")
        .leftJoinAndSelect("contratacoesmotoboys.contratado", "contratado")
        .select("contratacoesmotoboys", "id")
        .addSelect([
            "entrega",
            "contratante.id",
            "contratante.nome",
            "contratado.id",
            "contratado.nome",
            "contratado.flagtipoveiculo",
        ])
        .getMany();
            
            res.status(200).send({contratacoesMotoboys});
        }catch (error) {
            res.status(500).send({ error});
        }
    }
}
export default new ContratacaoController();