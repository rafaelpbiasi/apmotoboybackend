import { Router } from "express";
import usuarioController from "../controller/usuario.controller";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get(
      "/",
      usuarioController.findAll
    );
  }
}

export const UsuarioRouter = () => {
  return new Routes().router;
};