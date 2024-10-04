import { DataTypes } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

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
;(async () => {
  await FaqCategory.sync({ force: false })
})()
