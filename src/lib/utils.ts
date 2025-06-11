import { UploadApiResponse } from "cloudinary";

import { ValidationError } from "@/types";

import cloudinary from "./cloudinary";
import { MAX_CONTENT_LENGTH } from "./constants";

export async function formatError(error: ValidationError) {
  if (error.name === "ZodError") {
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join(". ");
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

export const truncate = (
  text: string,
  maxLength: number = MAX_CONTENT_LENGTH
) => {
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
};

export const uploadImage = async (image: File) => {
  const imageFile = image;
  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult = await new Promise<UploadApiResponse>((resolve) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "articles",
        },
        (error, uploadResult) => {
          if (error || !uploadResult) {
            console.error("❌ Cloudinary upload failed:", error);
            throw new Error("Image upload failed");
          }

          return resolve(uploadResult as UploadApiResponse);
        }
      )
      .end(buffer);
  });

  return uploadResult;
};
