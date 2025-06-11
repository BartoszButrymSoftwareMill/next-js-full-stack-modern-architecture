import Link from "next/link";

import { Card, CardBody, CardHeader, Image } from "@heroui/react";

import { getPublicArticles } from "@/lib/actions/article.actions";
import { truncate } from "@/lib/utils";

export default async function HomePage() {
  const articles = await getPublicArticles();

  return (
    <>
      <h1 className="my-8 text-5xl font-bold">Recent articles</h1>
      <div className="grid grid-cols-3 gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="gap-4 py-3 px-3">
            <CardHeader className="p-0 justify-center">
              <Link className="w-[300px] h-[200px]" href={`/${article.slug}`}>
                <Image
                  src={article.image!}
                  width={300}
                  height={200}
                  alt="Picture placeholder"
                  className="w-full object-cover"
                  isZoomed
                />
              </Link>
            </CardHeader>
            <CardBody className="p-0">
              <Link className="hover:underline" href={`/${article.slug}`}>
                <h4 className="font-bold text-large pb-2">{article.title}</h4>
              </Link>
              <small className="text-default-500">
                {truncate(article.content)}
              </small>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
