import * as http from "http";
import { createConnection } from "typeorm";
import app from "./app";

createConnection()
  .then((connection) => {
    const server = http.createServer(app);

    server.listen(8000, () => {
      console.log('Application is running on port 8000 !!');
    });
  })
  .catch((error) => {
    console.log("TypeORM dont connected: %s", error);
  });