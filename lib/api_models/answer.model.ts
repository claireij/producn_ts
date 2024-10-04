import { DataTypes } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

export const Answer = sequelize.define(
  "Answer",
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
    parent_question_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    child_question_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription: {
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
    tableName: "questiontree_answer",
    timestamps: true,
  },
)
;(async () => {
  await Answer.sync({ force: false })
})()
