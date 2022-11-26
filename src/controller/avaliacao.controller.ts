import { Request, response, Response } from "express";
import { getRepository } from "typeorm";
import { AvaliacaoEntity } from "../entity/avaliacao.entity";
import * as Yup from "yup"
import { UsuarioEntity } from "../entity/usuario.entity";

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
                perfilavaliado: data.codperfilavaliado,
                estrela: data.estrela
            })
            await getRepository(AvaliacaoEntity).save(avaliacao)

            const avaliacoes = await getRepository(AvaliacaoEntity).createQueryBuilder("avaliacao")
            .select("avaliacao", "id")
            .where(
              `avaliacao.codperfilavaliado=${data.codperfilavaliado} `
             )
             .getMany();
         
             var estrelas = 0
             avaliacoes.forEach(item=>{estrelas+=item.estrela})

             const usuario = await getRepository(UsuarioEntity).findOneBy({id: Number(data.codperfilavaliado)})

             const usuarioAtualizado={
                ...usuario,
                mediaestrelas: estrelas/avaliacoes.length,
            }
            await getRepository(UsuarioEntity).save(usuarioAtualizado)

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