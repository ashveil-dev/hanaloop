import {
    bigserial,
    index,
    numeric,
    pgTable,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const EmissionFactorsTable = pgTable(
    "emission_factors",
    {
        id: bigserial("id", { mode: "number" }).primaryKey(),
        name: varchar("name", { length: 255 }).notNull(),
        category: varchar("category", { length: 100 }).notNull(),
        factor: numeric("factor", { precision: 15, scale: 6 }).notNull(),
        inputUnit: varchar("input_unit", { length: 50 }).notNull(),
        outputUnit: varchar("output_unit", { length: 50 }).notNull().default("kgCO2e"),
        description: varchar("description", { length: 500 }),
        createdAt: timestamp("created_at").notNull().defaultNow(),
    },
    (table) => [index("idx_emission_factors_category").on(table.category)]
);
