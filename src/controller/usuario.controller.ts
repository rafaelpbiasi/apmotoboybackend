import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UsuarioEntity } from "../entity/usuario.entity";
import * as Yup from "yup"

class UsuarioController{
    public async findAll(req:Request, res:Response){
        try{
            const usuarios = await getRepository(UsuarioEntity).find()
            res.status(200).send({usuarios});
        }catch (error) {
            res.status(500).send({ error});
        }
    }

    public async login(req:Request, res:Response){
      try{
          const data = req.body
          const usuario = await getRepository(UsuarioEntity).findOne(
            {where: {email: data.email, senha: data.senha}}
          )

          if(usuario){
            res.status(200).send({usuario});
            return 
          }

          res.status(404).send({mensagem: "dados inválidos"});

      }catch (error) {
          res.status(500).send({ error});
      }
  }

    public async create(req:Request, res:Response){
        try{
            const data = req.body
            enum testeflag{
                verdadeiro='T', 
                falso='F'
            }
            const schema = Yup.object().shape({
                nome: Yup.string().required("É obrigatorio informar um nome!"),
                telefone: Yup.string().required("É obrigatorio"),
                email: Yup.string().email('e-mail não é válido').required("É obrigatorio"),
                senha: Yup.string().required("É obrigatorio"),
                cpfcnpj: Yup.string().required("É obrigatorio"),
                flagconfirmatermos: Yup.mixed<testeflag>().oneOf(Object.values(testeflag), "este campo precisa ser T ou F"),
              });
        
            //Valida Estrutura Json
            await schema.validate(data, {
              abortEarly: false,
            });

            const image = req.file as Express.Multer.File;

            if(image){
              data.fotocnh = image.filename
            }

            const usuario = getRepository(UsuarioEntity).create(data)
            await getRepository(UsuarioEntity).save(usuario)

            res.status(201).send(usuario);
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
export default new UsuarioController();