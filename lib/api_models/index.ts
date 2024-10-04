import { BlogArticle } from "./blogArticle.model"
import { BlogCategory } from "./blogCategory.model"
import { Faq } from "./faq.model"
import { FaqCategory } from "./faqCategory.model"

BlogCategory.hasMany(BlogArticle, { foreignKey: "category_id" })
BlogArticle.belongsTo(BlogCategory, { foreignKey: "category_id" })

Faq.belongsTo(FaqCategory, { foreignKey: "category_id" })
FaqCategory.hasMany(Faq, { foreignKey: "category_id" })

export { BlogCategory, BlogArticle, Faq, FaqCategory }
