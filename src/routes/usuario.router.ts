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
    this.router.post(
      "/login",
      usuarioController.login
    );
    this.router.get(
      "/motoboys",
      usuarioController.findByMotoboys
    );
    this.router.get(
      "/motoboys/veiculo/:veiculo",
      usuarioController.findByMotoboysVeiculo
    );
    this.router.get(
      "/perfil/:id([0-9]+)",
      usuarioController.findByPerfil
    );
    this.router.get(
      "/perfil/avaliacao/:id([0-9]+)",
      usuarioController.findAvaliacao
    );
    this.router.get(
      "/relatorio/:id([0-9]+)",
      usuarioController.findByRelatorio
    );
  }
}

export const UsuarioRouter = () => {
  return new Routes().router;
};