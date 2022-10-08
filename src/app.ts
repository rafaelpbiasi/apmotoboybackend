import * as express from "express";
import * as cors from "cors";
import { AvaliacaoRouter, ContratacaoRouter, EntregaRouter, UsuarioRouter } from "./routes";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  //Carrega os middleware da aplicação
  private middleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.use(express.static("uploads"));
  }

  private routes(): void {
    this.express.use("/usuario", UsuarioRouter());
    this.express.use("/avaliacao", AvaliacaoRouter());
    this.express.use("/contratacao", ContratacaoRouter());
    this.express.use("/entrega", EntregaRouter());
  }
}

export default new App().express;