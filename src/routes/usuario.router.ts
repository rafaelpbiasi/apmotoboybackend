import { Router } from "express";
import { upload } from "../config/upload";
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
    this.router.post(
      "/", [upload().single("fotocnh")],
      usuarioController.create
    );
    /*this.router.post(
      "/updateimageperfil", [upload().single("image")],
      usuarioController.create
    );*/
    this.router.post(
      "/login",
      usuarioController.login
    );
  }
}

export const UsuarioRouter = () => {
  return new Routes().router;
};