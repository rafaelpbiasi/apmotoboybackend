import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UsuarioEntity } from "../entity/usuario.entity";

class UsuarioController{
    public async findAll(req:Request, res:Response){
        try{
            const usuarios = await getRepository(UsuarioEntity).find()
            res.status(200).send({usuarios});
        }catch (error) {
            res.status(500).send({ error});
        }
    }
}
export default new UsuarioController();