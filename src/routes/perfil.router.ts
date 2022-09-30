import { Router } from "express";
import perfilController from "../controller/perfil.controller";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get(
      "/",
      perfilController.findAll
    );
  }
}

export const PerfilRouter = () => {
  return new Routes().router;
};