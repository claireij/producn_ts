import { Layout } from "@components/Layout"
import { Tag } from "@components/_general/Tag"
import { useState } from "react"
import { useRouter } from "next/router"
import { BlogService, getArticlesParams } from "@services/blog.service"
import { Card } from "@components/_general/Card"
import { Search } from "@components/_general/Search"
import { Pagination } from "@components/_general/Pagination"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "@components/Loader"

function Blog() {
  const router = useRouter()

  const [activeCategoriesId, setActiveCategoriesId] = useState<Array<string>>(
    [],
  )
  const [params, setParams] = useState<getArticlesParams>({ page: 1 })
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: { rows: articles, count: totalArticles } = {},
    isLoading: isLoadingArticles,
    isError: isErrorArticles,
  } = useQuery({
    queryKey: ["articles", params],
    queryFn: () => BlogService.getArticles(params),
  })

  const { data: categories } = useQuery({
    queryKey: ["blog_categories"],
    queryFn: () => BlogService.getCategories(),
  })

  const handleArticleClick = (id: string) => {
    router.push(`/blog/posts/${id}`)
  }

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategoriesId((prev) => {
      const newActiveCategories = prev.includes(categoryId)
        ? prev.filter((activeCategoryId) => activeCategoryId !== categoryId)
        : [...prev, categoryId]

      setParams({
        ...params,
        categories: newActiveCategories.join(","),
        page: 1,
      })
      setCurrentPage(1)
      return newActiveCategories
    })
  }

  const handleSearch = (value: string) => {
    setParams({
      ...params,
      searchTerm: value,
      page: 1,
    })
    setCurrentPage(1)
  }

  return (
    <Layout title="Blog" centered={false}>
      <Search onSearch={handleSearch} />

      <div className="flex gap-2 mb-10 w-[500px] flex-wrap">
        {categories?.map((category) => (
          <Tag
            key={category.id}
            active={activeCategoriesId.includes(category.id)}
            name={category.name}
            handleClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>

      {(totalArticles === 0 || isErrorArticles) && (
        <p>Couldn't find any articles.</p>
      )}

      <div className="flex justify-center">
        {isLoadingArticles ? (
          <Loader />
        ) : (
          <div>
            <div className="flex gap-8 flex-wrap justify-center">
              {articles?.map((article) => {
                return (
                  <Card
                    onClick={() => {
                      handleArticleClick(article.id)
                    }}
                    title={article.title}
                    description={`${article.content.slice(0, 300)}...`}
                    key={article.id}
                  />
                )
              })}
            </div>

            <Pagination
              current={currentPage}
              total={totalArticles || 0}
              onChange={(page) => {
                setParams({ ...params, page: page })
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Blog
