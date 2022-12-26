import express from "express";
import config from "./config/config";
import sequelize from "./loaders/database";
import Loaders from "./loaders/express";
import Comments from "./models/sql/comments";
import Posts from "./models/sql/posts";
import User from "./models/sql/user";

async function startServer() {
  const app: express.Application = express();
  Loaders({ app });
  User.hasMany(Posts, {
    foreignKey: "uid",
  });
  Posts.belongsTo(User);

  Posts.hasMany(Comments, {
    foreignKey: "pid",
  });
  Comments.belongsTo(Posts);

  await sequelize.sync({ force: true });
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
