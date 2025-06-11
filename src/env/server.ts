import { createEnv } from "@t3-oss/env-nextjs";
import "dotenv/config";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    SESSION_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    CLOUDINARY_NAME: z.string(),
    CLOUDINARY_KEY: z.string(),
    CLOUDINARY_SECRET: z.string(),
  },
  onValidationError: (issues) => {
    console.error("❌ Invalid environment variables:", issues);
    process.exit(1);
  },
  emptyStringAsUndefined: true,
  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
});
