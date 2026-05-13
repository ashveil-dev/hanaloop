import { AnyPgColumn, bigint, bigserial, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const GroupsSchema = pgTable("groups", {
    id: bigserial("id", { mode: "number" }).primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    parentId: bigint("parent_id", { mode: "number" }).references(
        (): AnyPgColumn => GroupsSchema.id,
        { onDelete: "set null" }
    ),

    createdAt: timestamp("created_at").notNull().defaultNow(),
});