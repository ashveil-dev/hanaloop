import { bigint, bigserial, check, date, index, numeric, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { GroupsTable } from "@/lib/server/db/schema/groups";
import { sql } from "drizzle-orm";

export const EmissionRecordsTable = pgTable(
  "emission_records",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    groupId: bigint("group_id", { mode: "number" })
      .notNull()
      .references(() => GroupsTable.id, { onDelete: "cascade" }),

    scopeType: varchar("scope_type", { length: 20 }).notNull(),
    amount: numeric("amount", {
      precision: 15,
      scale: 2,
    }).notNull(),
    unit: varchar("unit", { length: 20 }).notNull().default("tCO2e"),
    recordedAt: date("recorded_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    check(
      "scope_type_check",
      sql`${table.scopeType} IN ('SCOPE1', 'SCOPE2', 'SCOPE3')`
    ),

    index("idx_emission_records_group_id").on(table.groupId),
    index("idx_emission_records_recorded_at").on(table.recordedAt),
    index("idx_emission_records_scope_type").on(table.scopeType),
  ]
);