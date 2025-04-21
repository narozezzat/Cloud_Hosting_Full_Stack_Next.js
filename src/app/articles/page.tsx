import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Article } from '@/utils/types';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles about programming',
}

const ArticlesPage = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    // { cache: "no-store" } // To Prevent Caching data and send request again
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const articles: Article[] = await response.json();

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.slice(0, 6).map(item => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination />
    </section>
  )
}

export default ArticlesPage