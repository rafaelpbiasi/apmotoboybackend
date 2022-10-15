import { Router } from "express";
import contratacaoController from "../controller/contratacao.controller";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get(
      "/",
      contratacaoController.findAll
    );

    this.router.get(
      "/porContratante/:id([0-9]+)",
      contratacaoController.findByContratante
    );
    this.router.get(
      "/porMotoboy/:id([0-9]+)",
      contratacaoController.findByMotoboy
    );
    this.router.get(
      "/entregas",
      contratacaoController.findByEntrega
    );
    this.router.get(
      "/motoboys",
      contratacaoController.findByMotoboys
    );
  }
}

export const ContratacaoRouter = () => {
  return new Routes().router;
};