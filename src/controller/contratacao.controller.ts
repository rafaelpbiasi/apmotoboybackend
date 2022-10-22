import { Request, Response } from "express";
import { Equal, getRepository } from "typeorm";
import * as Yup from "yup"
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

    public async create(req:Request, res:Response){
        try{
            const data = req.body
            console.log(data)
            const schema = Yup.object().shape({});
        
            //Valida Estrutura Json
            await schema.validate(data, {
              abortEarly: false,
            });

            const contratacao = getRepository(ContratacaoEntity).create({ 
                status: data.status,
                contratado: data.codusuariocontratado,
                contratante: data.codusuariocontratante,
                entrega: data.codentrega,
                data: data.data,
            })
            await getRepository(ContratacaoEntity).save(contratacao)

            res.status(201).send(contratacao);
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
            
            res.status(200).send({data:contratacoes});
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
            
            res.status(200).send({data:contratacoesMotoboy});
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

    public async findByEntregaStatus(req:Request, res:Response){
        try{
            
        const idUsuario = req.params.id
        const statusentrega = req.params.status
        const usuario = await getRepository(UsuarioEntity).findOneBy({id: Number(idUsuario)})
        const status = await getRepository(ContratacaoEntity).findOneBy({status: Equal(statusentrega)})

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
        .where(
         `contratacoesentrega.codusuariocontratante=${usuario.id} and contratacoesentrega.status='${status.status}' `
        )
        .getMany();
            
        console.log(contratacoesEntrega)
            res.status(200).send({data:contratacoesEntrega});
        }catch (error) {
            console.log(error)
            res.status(500).send({ error});
        }
    }

    public async findByMotoboysStatus(req:Request, res:Response){
        try{
        
        const idUsuario = req.params.id
        const statusentrega = req.params.status
        const usuario = await getRepository(UsuarioEntity).findOneBy({id: Number(idUsuario)})
        const status = await getRepository(ContratacaoEntity).findOneBy({status: Equal(statusentrega)})

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
        .where(
         `contratacoesmotoboys.codusuariocontratado=${usuario.id} and contratacoesmotoboys.status='${status.status}' `
        )
        .getMany();
            
            res.status(200).send({data:contratacoesMotoboys});
        }catch (error) {
            res.status(500).send({ error});
        }
    }
}
export default new ContratacaoController();