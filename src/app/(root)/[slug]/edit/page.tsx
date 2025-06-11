import { ArticleForm } from "@/components/ui/form/article-form";
import { getArticleBySlug } from "@/lib/actions/article.actions";

export default async function EditArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  return (
    <>
      <h1 className="my-8 text-5xl font-bold">Edit an article</h1>
      <ArticleForm article={article} />
    </>
  );
}
