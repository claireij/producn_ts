import { useSession } from "next-auth/react"
import { Layout } from "@components/Layout"
import axios from "axios"
import { BlogService } from "@services/blog.service"
import { Article } from "@models/blog"
import { UserService } from "@services/user.service"
import { IoMdArrowRoundBack } from "react-icons/io"
import { useRouter } from "next/router"
import moment from "moment"
import { dateFormat } from "consts"
import { ensureError } from "@utils/general.utils"

interface PostInterface {
  article: Article
}

export default function Post({ article }: PostInterface) {
  const router = useRouter()

  const { data: session, status } = useSession()

  if (session && session.user?.email) {
    try {
      UserService.updateUser({
        email: session.user?.email,
        articles_read: 1,
      })
    } catch (err) {
      const error = ensureError(err)
      console.log(error)
    }
  }

  if (!article) return <p>Couldn't find this article.</p>

  return (
    <Layout title={article.title} isLoading={status === "loading"}>
      <p className="mb-5">{article.content}</p>

      <p className="text-grey-300">
        {moment(article.updatedAt).format(dateFormat)}
      </p>
      <div
        className="flex gap-2 items-center mb-5 cursor-pointer"
        onClick={() => {
          router.push("/blog")
        }}
      >
        <IoMdArrowRoundBack />
        <p>Back to all articles</p>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await BlogService.getArticles({})
  const articles = data.rows

  const paths = articles.map((article: Article) => ({
    params: { id: article.id.toString() },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const response = await axios.get(
    `http://localhost:3000/api/blog/articles/${params.id}`,
  )
  const data = await response.data

  return {
    props: {
      article: data,
    },
  }
}
