import { z } from "zod";

import { articleFormSchema } from "@/validations/article.validator";

export type ValidationError = {
  name: "ZodError";
  errors: Record<string, { message: string }>;
  message: string | object;
};

export type FormState =
  | {
      success: boolean;
      message: string;
    }
  | {
      success: boolean;
      message: Promise<string>;
    };

export type NewArticleTypes = z.infer<typeof articleFormSchema>;

export type EditArticleTypes = {
  id: string | null;
  image: string | null;
  title: string | null;
  content: string | null;
  isPublic: boolean | null;
};

export type UpdateArticleTypes = {
  id: string;
  values: Partial<{
    title: string;
    content: string;
    image: string | File;
    isPublic: boolean;
  }>;
  dirtyFields: string[];
};

export type ArticleUpdateData = Partial<{
  title: string;
  content: string;
  image: string;
  isPublic: boolean;
  slug: string;
  updatedAt: string;
}>;
