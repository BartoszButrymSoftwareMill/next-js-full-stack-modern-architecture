"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@heroui/button";
import { Image, Input, Switch, Textarea, addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { createArticle, updateArticle } from "@/lib/actions/article.actions";
import { articleValues } from "@/lib/constants";
import { EditArticleTypes } from "@/types";
import { articleFormSchema } from "@/validations/article.validator";

export const ArticleForm = ({ article }: { article?: EditArticleTypes }) => {
  const router = useRouter();

  const isEditMode = !!article;

  const [imagePreview, setImagePreview] = useState<string | null>(
    article?.image ?? null
  );

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, dirtyFields, isDirty },
  } = useForm({
    resolver: zodResolver(articleFormSchema),
    defaultValues: !!article
      ? {
          title: article.title!,
          content: article.content!,
          image: article.image!,
          isPublic: article.isPublic!,
        }
      : articleValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof articleFormSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      let res;
      if (!!article) {
        res = await updateArticle({
          values,
          dirtyFields: Object.keys(dirtyFields),
          id: article!.id!,
        });
      } else {
        res = await createArticle(values);
      }

      if (!res.success) {
        addToast({
          title: res.message,
          color: "danger",
        });

        return;
      }

      addToast({
        title: res.message,
        color: "success",
      });

      router.push("/");
    });
  };

  const image = watch("image");

  useEffect(() => {
    if (image instanceof File) {
      const imageUrl = URL.createObjectURL(image);
      setImagePreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    }

    if (typeof image === "string") {
      setImagePreview(image);
    }
  }, [image]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-6">
          <Controller
            name="image"
            control={control}
            render={({ field: { ref, name, onBlur, onChange } }) => {
              return (
                <Input
                  type="file"
                  variant="bordered"
                  ref={ref}
                  accept="image/*"
                  name={name}
                  onBlur={onBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                    setImagePreview(
                      file
                        ? URL.createObjectURL(file)
                        : (article?.image ?? null)
                    );
                  }}
                  classNames={{
                    inputWrapper: errors.image
                      ? "border-red-900 h-[56px]"
                      : "border-slate-900 h-[56px]",
                  }}
                />
              );
            }}
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              width={300}
              height={200}
              alt="Picture placeholder"
              className="w-full object-cover"
            />
          )}
          <p className="mt-1 text-sm text-red-700">{errors.image?.message}</p>
        </div>
        <div>
          <Input
            id="title"
            type="text"
            autoComplete="title"
            label="Title"
            variant="bordered"
            classNames={{
              inputWrapper: errors.title
                ? "border-red-900"
                : "border-slate-900",
            }}
            {...register("title", { required: true })}
          />
          <p className="mt-1 text-sm text-red-700">{errors.title?.message}</p>
        </div>
        <div>
          <Textarea
            id="content"
            placeholder="Enter your description"
            label="Content"
            variant="bordered"
            classNames={{
              inputWrapper: errors.content
                ? "border-red-900"
                : "border-slate-900",
            }}
            {...register("content", { required: true, maxLength: 3000 })}
          />
          <p className="mt-1 text-sm text-red-700">{errors.content?.message}</p>
        </div>
        <div>
          <Switch id="isPublic" {...register("isPublic")}>
            Publish
          </Switch>
        </div>

        <Button
          isDisabled={isPending || (isEditMode && !isDirty)}
          className="w-full h-[56px]"
          type="submit"
          color="primary"
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};
