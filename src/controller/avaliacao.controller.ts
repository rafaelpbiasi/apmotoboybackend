import { Request, response, Response } from "express";
import { getRepository } from "typeorm";
import { AvaliacaoEntity } from "../entity/avaliacao.entity";
import * as Yup from "yup"

class AvaliacaoController{
    public async findAll(req:Request, res:Response){
        try{
            const avaliacoes = await getRepository(AvaliacaoEntity).find()
            res.status(200).send({avaliacoes});
        }catch (error) {
            res.status(500).send({ error});
        }
    }

    public async create(req:Request, res:Response){
        try{
            const data = req.body
        
            const schema = Yup.object().shape({});
        
            //Valida Estrutura Json
            await schema.validate(data, {
              abortEarly: false,
            });


            const avaliacao = getRepository(AvaliacaoEntity).create({ 
                comentario: data.comentario,
                perfilavaliador: data.codperfilavaliador.id,
                perfilavaliado: data.codperfilavaliado
            })
            await getRepository(AvaliacaoEntity).save(avaliacao)

            res.status(201).send(avaliacao);
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
export default new AvaliacaoController();