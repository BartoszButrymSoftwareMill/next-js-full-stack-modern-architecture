"use server";

import { redirect } from "next/navigation";

import { eq, or } from "drizzle-orm";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import slugify from "slugify";

import { auth } from "@/auth";
import db from "@/db";
import { articles } from "@/db/schema";
import {
  ArticleUpdateData,
  NewArticleTypes,
  UpdateArticleTypes,
  ValidationError,
} from "@/types";
import { articleFormSchema } from "@/validations/article.validator";

import { formatError, uploadImage } from "../utils";

export async function getPublicArticles() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return await db.query.articles.findMany({
      where: eq(articles.isPublic, true),
    });
  }

  return await db.query.articles.findMany({
    where: or(eq(articles.isPublic, true), eq(articles.authorId, userId)),
  });
}

export async function createArticle(data: NewArticleTypes) {
  const session = await auth();

  try {
    const parsedArticle = articleFormSchema.parse(data);

    const slug = slugify(parsedArticle.title, {
      lower: true,
      strict: true,
    });

    const uploadResult = await uploadImage(data.image as File);

    const article = {
      ...parsedArticle,
      slug,
      authorId: session!.user!.id,
    };

    await db.insert(articles).values({
      title: article.title,
      slug: article.slug,
      content: article.content,
      image: uploadResult.secure_url,
      isPublic: article.isPublic,
      authorId: article.authorId,
    });

    return {
      success: true,
      message: "Article created successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error as ValidationError) };
  }
}

export async function updateArticle({
  id,
  values,
  dirtyFields,
}: UpdateArticleTypes) {
  if (Object.keys(dirtyFields).length === 0) {
    return { success: false, message: "No fields to update." };
  }

  const updateData: ArticleUpdateData = {};

  if (dirtyFields.includes("image")) {
    const uploadResult = await uploadImage(values.image as File);
    updateData.image = uploadResult.secure_url;
  }

  dirtyFields.forEach((field) => {
    if (field === "title") {
      updateData.title = values.title as string;

      const slug = slugify(values.title!, {
        lower: true,
        strict: true,
      });

      updateData.slug = slug;
    } else if (field === "content") {
      updateData.content = values.content as string;
    } else if (field === "isPublic") {
      updateData.isPublic = values.isPublic as boolean;
    }
  });

  updateData.updatedAt = new Date().toISOString();

  await db.update(articles).set(updateData).where(eq(articles.id, id));

  return { success: true, message: "Article updated successfully!" };
}

export async function publishArticle(id: string) {
  try {
    await db
      .update(articles)
      .set({ isPublic: true })
      .where(eq(articles.id, id));

    return { success: true, message: "Article is now publicly visible" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error as ValidationError) };
  }
}

export async function getArticleBySlug(slug: string) {
  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });

  return article;
}

export async function deleteArticle(id: string) {
  await db.delete(articles).where(eq(articles.id, id));

  redirect("/");
}
