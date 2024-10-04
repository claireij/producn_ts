import { DataTypes } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

export const BlogCategory = sequelize.define(
  "BlogCategory",
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
    tableName: "blog_category",
    timestamps: true,
  },
)
;(async () => {
  try {
    await BlogCategory.sync({ force: false })
    console.log("BlogCategory table has been synced successfully.")
  } catch (error) {
    console.error("Error syncing BlogCategory table:", error)
  }
})()
