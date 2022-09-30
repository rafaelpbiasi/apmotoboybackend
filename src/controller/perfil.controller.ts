import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { PerfilEntity } from "../entity/perfil.entity";

class PerfilController{
    public async findAll(req:Request, res:Response){
        try{
            const perfil = await getRepository(PerfilEntity).find()
            res.status(200).send({perfil});
        }catch (error) {
            res.status(500).send({ error});
        }
    }
}
export default new PerfilController();