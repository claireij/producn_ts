import { Layout } from "@components/Layout"
import { useState, useMemo } from "react"
import { FaqService } from "@services/faq.service"
import { Search } from "@components/_general/Search"
import { useQuery } from "@tanstack/react-query"
import { Collapse } from "@components/_general/collapse/Collapse"

export default function Faqs() {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const {
    data: faqs = [],
    isLoading: isLoadingFaqs,
    isError: isErrorFaqs,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: FaqService.getFaqs,
  })

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: FaqService.getCategories,
  })

  /* This is a frontend filter for the search, contrary to the search for the blog page
  Depending on the amount of data, the filtering should be moved to the backend.
  */
  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqs
    const searchTermLower = searchTerm.toLowerCase()
    return faqs.filter((faq) =>
      faq.question.toLowerCase().includes(searchTermLower),
    )
  }, [faqs, searchTerm])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <Layout
      title="FAQs"
      isLoading={isLoadingFaqs || isLoadingCategories}
      hasError={isErrorFaqs || isErrorCategories}
      centered={false}
    >
      <Search onSearch={handleSearchChange} />

      {categories.length === 0 && <p>No categories found.</p>}

      {categories.map((category) => {
        const faqsOnCategory = filteredFaqs
          .filter((faq) => faq.category_id === category.id)
          .map((faq) => ({
            key: faq.id,
            label: faq.question,
            children: faq.answer,
          }))

        return (
          <Collapse
            key={category.id}
            items={faqsOnCategory}
            title={category.name}
            emptyMessage="No FAQs found for this search term."
          />
        )
      })}
    </Layout>
  )
}
