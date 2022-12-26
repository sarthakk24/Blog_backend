import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import sequelize from "../../loaders/database";
const Keywords = sequelize.define("keywords", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  keyword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Keywords;
