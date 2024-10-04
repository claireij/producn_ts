import { DataTypes } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

export const Faq = sequelize.define(
  "Faq",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: 1,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "faq",
    timestamps: true,
  },
)
;(async () => {
  await Faq.sync({ force: false })
})()
