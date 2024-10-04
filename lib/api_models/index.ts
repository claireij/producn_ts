import { BlogArticle } from "./blogArticle.model"
import { BlogCategory } from "./blogCategory.model"

BlogCategory.hasMany(BlogArticle, { foreignKey: "category_id" })
BlogArticle.belongsTo(BlogCategory, { foreignKey: "category_id" })

export { BlogCategory, BlogArticle }
