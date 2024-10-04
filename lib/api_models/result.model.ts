import { DataTypes } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

export const Result = sequelize.define(
  "Result",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: 1,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "questiontree_result",
    timestamps: true,
  },
)
;(async () => {
  await Result.sync({ force: false })
})()
