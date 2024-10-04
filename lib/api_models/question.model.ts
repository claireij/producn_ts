import { DataTypes } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

export const Question = sequelize.define(
  "Question",
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
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "questiontree_question",
    timestamps: true,
  },
)
;(async () => {
  await Question.sync({ force: false })
})()
