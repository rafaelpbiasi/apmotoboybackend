import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ContratacaoEntity } from "../entity/contratacao.entity";

class ContratacaoController{
    public async findAll(req:Request, res:Response){
        try{
            const contratacoes = await getRepository(ContratacaoEntity).find()
            res.status(200).send({contratacoes});
        }catch (error) {
            res.status(500).send({ error});
        }
    }
}
export default new ContratacaoController();