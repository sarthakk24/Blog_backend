import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import sequelize from "../../loaders/database";
const Posts = sequelize.define("posts", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(1234),
    allowNull: true,
  },
  likes: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

export default Posts;
