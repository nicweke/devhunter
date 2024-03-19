// import { serial, text, pgTable, pgSchema } from "drizzle-orm/pg-core";
// export const mySchema = pgSchema("my_schema")
// export const mySchemaUsers = mySchema.table('users', {
//     id: serial('id').primaryKey(),
//     name: text('name'),
// });
// CREATE SCHEMA "my_schema";
// CREATE TABLE "my_schema"."users"(
//     "id" serial PRIMARY KEY,
//     "name" text
// );

import { text, pgTable, } from "drizzle-orm/pg-core";
export const testing = pgTable("testing", {
    id: text('id').primaryKey().notNull(),
    name: text('name'),
})