import express from "express";
import config from "./config/config";
import Loaders from "./loaders/express";

async function startServer() {
  const app: express.Application = express();
  await Loaders({ app });
  console.log(config.port);

  app
    .listen(config.port, () => {
      console.log(`🛡️  Server listening on port: ${config.port}`);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
