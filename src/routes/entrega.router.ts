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
  }
}

export const EntregaRouter = () => {
  return new Routes().router;
};