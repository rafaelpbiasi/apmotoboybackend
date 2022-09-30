import * as express from "express";
import * as cors from "cors";
import { UsuarioRouter } from "./routes";

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
    //this.express.use(express.static("uploads"));
  }

  private routes(): void {
    this.express.use("/usuario", UsuarioRouter());
  }
}

export default new App().express;