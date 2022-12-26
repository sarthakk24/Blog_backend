import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import sequelize from "../../loaders/database";
const Comments = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Comments;
