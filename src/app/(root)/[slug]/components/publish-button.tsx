"use client";

import Image from "next/image";

import { Button, Tooltip, addToast } from "@heroui/react";

import { PublishIcon } from "@/assets/icons";
import { publishArticle } from "@/lib/actions/article.actions";

export const PublishButton = ({ articleId }: { articleId: string }) => {
  const makeArticlePublic = async () => {
    const res = await publishArticle(articleId);

    if (res.success) {
      addToast({
        title: res.message,
        color: "success",
      });

      return;
    }

    addToast({
      title: "Article was not published",
      description: res.message,
      color: "danger",
    });
  };

  return (
    <Button
      isIconOnly
      className="bg-green-300"
      type="submit"
      onPress={makeArticlePublic}
    >
      <Tooltip content="Publish">
        <Image
          src={PublishIcon}
          width={20}
          height={20}
          alt="Publish article icon"
          priority={true}
        />
      </Tooltip>
    </Button>
  );
};
