import { Request, Response } from "express";
import { Equal, getRepository } from "typeorm";
import { UsuarioEntity } from "../entity/usuario.entity";
import * as Yup from "yup"
import { ContratacaoEntity } from "../entity/contratacao.entity";

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

    public async findByMotoboys(req:Request, res:Response){
      try{
          
      const findMotoboys = await getRepository(UsuarioEntity).createQueryBuilder("findmotoboys")
      .select("findmotoboys", "id")
      .getMany();
          
          res.status(200).send({data:findMotoboys});
      }catch (error) {
        console.log(error)
          res.status(500).send({ error});
      }
  }

  public async findByMotoboysVeiculo(req:Request, res:Response){
    try{
    
    const veiculoentrega = req.params.veiculo
    const veiculo = await getRepository(UsuarioEntity).findOneBy({flagtipoveiculo: Equal(veiculoentrega)})

    const findMotoboys = await getRepository(UsuarioEntity).createQueryBuilder("findmotoboys")
    .select("findmotoboys", "id")
    .where(
     `findmotoboys.flagtipoveiculo='${veiculo.flagtipoveiculo}' `
    )
    .getMany();
        
        res.status(200).send({data:findMotoboys});
    }catch (error) {
        res.status(500).send({ error});
    }
}

public async findByPerfil(req:Request, res:Response){
  try{

  const idUsuario = req.params.id
  const usuario = await getRepository(UsuarioEntity).findOneBy({id: Number(idUsuario)})

  const findPerfil = await getRepository(UsuarioEntity).createQueryBuilder("findperfil")
  .select("findperfil", "id")
  .where(
   `findperfil.id=${usuario.id} `
  )
  .getOne();
      
  const findQtdEntrega = await getRepository(ContratacaoEntity).createQueryBuilder("findqtdentrega")
  .select("findqtdentrega", "id")
  .where(
    `findqtdentrega.codusuariocontratado=${usuario.id} `
   )
   .getCount();
   console.log(findQtdEntrega)

      res.status(200).send({data:{
        ...findPerfil, qtdEntrega:findQtdEntrega
      }});
  }catch (error) {
      res.status(500).send({ error});
  }
}

public async findByRelatorio(req:Request, res:Response){
  try{

  const idUsuario = req.params.id
  const usuario = await getRepository(UsuarioEntity).findOneBy({id: Number(idUsuario)})

  const findRelatorio = await getRepository(ContratacaoEntity).createQueryBuilder("findrelatorio")
  .leftJoinAndSelect("findrelatorio.entrega", "entrega")
  .leftJoinAndSelect("findrelatorio.contratante", "contratante")
  .leftJoinAndSelect("findrelatorio.contratado", "contratado")
  .select("findrelatorio", "id")
  .addSelect([
      "entrega",
      "contratante.id",
      "contratante.nome",
      "contratado.id",
      "contratado.nome",
      "contratado.flagtipoveiculo",
  ])
  .where(
   `findrelatorio.codusuariocontratado=${usuario.id}`
  )
  .getMany();
      
  console.log(findRelatorio)
      res.status(200).send({data:findRelatorio});
  }catch (error) {
      res.status(500).send({ error});
  }
}

}
export default new UsuarioController();