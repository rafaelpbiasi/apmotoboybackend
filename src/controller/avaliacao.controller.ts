import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AvaliacaoEntity } from "../entity/avaliacao.entity";

class AvaliacaoController{
    public async findAll(req:Request, res:Response){
        try{
            const avaliacoes = await getRepository(AvaliacaoEntity).find()
            res.status(200).send({avaliacoes});
        }catch (error) {
            res.status(500).send({ error});
        }
    }
}
export default new AvaliacaoController();