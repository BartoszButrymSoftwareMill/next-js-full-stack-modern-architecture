import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024;

export const articleFormSchema = z.object({
  image: z.union([
    z
      .instanceof(File)
      .refine(
        (file) =>
          ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
            file.type
          ),
        { message: "Invalid image file type" }
      )
      .refine((file) => file.size <= fileSizeLimit, {
        message: "File size should not exceed 5MB",
      }),
    z.string(),
  ]),
  title: z
    .string()
    .min(6, "Title must be at least 6 characters")
    .max(255, "Title cannot be longer than 255 characters"),
  content: z
    .string()
    .min(6, "Description must be at least 6 characters")
    .max(3000, "Description cannot be longer than 3000 characters"),
  isPublic: z.boolean(),
});
