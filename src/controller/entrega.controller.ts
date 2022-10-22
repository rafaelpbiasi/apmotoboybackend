import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EntregaEntity } from "../entity/entrega.entity";
import * as Yup from "yup"
import { UsuarioEntity } from "../entity/usuario.entity";

class EntregaController{
    public async findAll(req:Request, res:Response){
        try{
            const entregas = await getRepository(EntregaEntity).find()
            res.status(200).send({entregas});
        }catch (error) {
            res.status(500).send({ error});
        }
    }

    public async create(req:Request, res:Response){
        try{
            const data = req.body
            console.log(data)
            const schema = Yup.object().shape({
                ruaorigem: Yup.string().required("É obrigatorio"),
                numeroorigem: Yup.string().required("É obrigatorio"),
                bairroorigem: Yup.string().required("É obrigatorio"),
                ruadestino: Yup.string().required("É obrigatorio"),
                numerodestino: Yup.string().required("É obrigatorio"),
                bairrodestino: Yup.string().required("É obrigatorio"),
              });
        
            //Valida Estrutura Json
            await schema.validate(data, {
              abortEarly: false,
            });

            const entrega = getRepository(EntregaEntity).create(data)
            await getRepository(EntregaEntity).save(entrega)

            res.status(201).send(entrega);
        }catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errorMessages = {};
                error.inner.forEach((err) => {
                  errorMessages[err.path] = err.message;
                });
                return res.status(400).send(errorMessages);
              } else {
                return res.status(500).send(error);
              }
        }
    }
}
export default new EntregaController();