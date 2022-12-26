import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import sequelize from "../../loaders/database";
const Posts = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
