import { DataTypes } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

export const BlogArticle = sequelize.define(
  "BlogArticle",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: 1,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preview_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "blog_article",
    timestamps: true,
  },
)
;(async () => {
  await BlogArticle.sync({ force: false })
})()
