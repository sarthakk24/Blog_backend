import express from "express";
import config from "./config/config";
import sequelize from "./loaders/database";
import Loaders from "./loaders/express";
import Comments from "./models/sql/comments";
import Keywords from "./models/sql/keywords";
import Likes from "./models/sql/likes";
import Posts from "./models/sql/posts";
import User from "./models/sql/user";

async function startServer() {
  const app: express.Application = express();
  Loaders({ app });
  User.hasMany(Posts);
  Posts.belongsTo(User);

  Posts.hasMany(Comments);
  Comments.belongsTo(Posts);

  Posts.hasMany(Keywords);
  Keywords.belongsTo(Posts);

  Posts.hasMany(Likes);
  Likes.belongsTo(Posts);

  await sequelize.sync();
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
