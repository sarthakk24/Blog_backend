import { DataTypes } from "sequelize";
import sequelize from "../../loaders/database";
const Likes = sequelize.define("likes", {
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

export default Likes;
