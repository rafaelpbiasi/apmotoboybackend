import { Router } from "express";
import entregaController from "../controller/entrega.controller";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get(
      "/",
      entregaController.findAll
    );
    this.router.post(
      "/",
      entregaController.create
    );
  }
}

export const EntregaRouter = () => {
  return new Routes().router;
};