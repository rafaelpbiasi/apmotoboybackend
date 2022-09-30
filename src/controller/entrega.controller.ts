import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EntregaEntity } from "../entity/entrega.entity";

class EntregaController{
    public async findAll(req:Request, res:Response){
        try{
            const entregas = await getRepository(EntregaEntity).find()
            res.status(200).send({entregas});
        }catch (error) {
            res.status(500).send({ error});
        }
    }
}
export default new EntregaController();