import { DataTypes } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"
import { Faq } from "./faq.model"

export const FaqCategory = sequelize.define(
  "FaqCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: 1,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "faq_category",
    timestamps: true,
  },
)

FaqCategory.hasMany(Faq, { foreignKey: "category_id" })
;(async () => {
  await FaqCategory.sync({ force: false })
})()
