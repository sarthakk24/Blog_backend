import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import sequelize from "../../loaders/database";
const Comments = sequelize.define("comments", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Comments;
