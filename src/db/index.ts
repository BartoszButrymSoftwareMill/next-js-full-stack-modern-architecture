import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env/server";

import * as schema from "./schema/index";

const queryClient = postgres(env.DATABASE_URL);
const db = drizzle({ client: queryClient, schema });

export default db;
