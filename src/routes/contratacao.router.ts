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
  }
}

export const ContratacaoRouter = () => {
  return new Routes().router;
};