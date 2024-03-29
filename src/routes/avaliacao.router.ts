import { Router } from "express";
import avaliacaoController from "../controller/avaliacao.controller";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get(
      "/",
      avaliacaoController.findAll
    );
    this.router.post(
      "/",
      avaliacaoController.create
    );
  }
}

export const AvaliacaoRouter = () => {
  return new Routes().router;
};