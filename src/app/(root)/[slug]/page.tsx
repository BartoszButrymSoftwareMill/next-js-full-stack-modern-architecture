import Image from "next/image";
import Link from "next/link";

import { Avatar, Image as HeroImage, Tooltip } from "@heroui/react";

import { brigitkaFont } from "@/assets/fonts/fonts";
import { EditIcon } from "@/assets/icons";
import { auth } from "@/auth";
import { getArticleBySlug } from "@/lib/actions/article.actions";
import { getUserById } from "@/lib/actions/user.actions";

import DeleteModal from "./components/delete-modal";
import { PublishButton } from "./components/publish-button";

export default async function ArticleDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  const article = await getArticleBySlug(slug);
  const author = await getUserById(article!.authorId);

  const actionsAreVisible = !!session && session.user?.id === article?.authorId;

  if (!article) {
    return (
      <h1
        className={`${brigitkaFont.className} my-8 text-5xl font-bold tracking-wider`}
      >
        Something went wrong.
      </h1>
    );
  }

  return (
    <>
      <h1
        className={`${brigitkaFont.className} my-8 text-5xl font-bold tracking-wider`}
      >
        {article?.title}
      </h1>
      <div className="flex gap-4 items-center justify-between mb-4">
        <div className="flex gap-4 items-center">
          <Avatar
            src={author.data!.image!}
            isBordered
            color="primary"
            as="button"
            className="transition-transform"
          />
          <span>{author.data?.name}</span>
        </div>
        {actionsAreVisible ? (
          <div className="flex gap-4 items-center">
            <PublishButton articleId={article.id!} />
            <Tooltip content="Edit">
              <Link
                href={`${slug}/edit`}
                className="bg-blue-200 rounded-xl w-[40px] h-[40px] flex items-center justify-center"
              >
                <Image
                  src={EditIcon}
                  width={20}
                  height={20}
                  alt="Edit article icon"
                  priority={true}
                />
              </Link>
            </Tooltip>
            <DeleteModal articleId={article.id} />
          </div>
        ) : null}
      </div>
      <HeroImage
        src={article.image!}
        alt="Picture placeholder"
        className="w-full object-cover mb-8"
        isLoading={!article.image}
      />
      <p>{article?.content}</p>
    </>
  );
}
