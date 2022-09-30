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
  }
}

export const ContratacaoRouter = () => {
  return new Routes().router;
};