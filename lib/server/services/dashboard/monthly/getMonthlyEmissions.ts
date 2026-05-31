import { db } from "@/lib/server/db";
import { EmissionRecordsTable } from "@/lib/server/db/schema/emissionRecords";
import { sql } from "drizzle-orm";

const MONTH_COUNT = 6;

function getLastMonthKeys(): string[] {
    const keys: string[] = [];
    const now = new Date();

    for (let i = MONTH_COUNT - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        keys.push(`${date.getFullYear()}-${month}`);
    }

    return keys;
}

function formatMonthLabel(monthKey: string): string {
    const month = parseInt(monthKey.split("-")[1], 10);
    return `${month}월`;
}

export async function getMonthlyEmissions() {
    const rows = await db
        .select({
            month: sql<string>`to_char(${EmissionRecordsTable.recordedAt}, 'YYYY-MM')`,
            scopeType: EmissionRecordsTable.scopeType,
            amount: sql<string>`coalesce(sum(${EmissionRecordsTable.amount}), 0)`,
        })
        .from(EmissionRecordsTable)
        .groupBy(
            sql`to_char(${EmissionRecordsTable.recordedAt}, 'YYYY-MM')`,
            EmissionRecordsTable.scopeType
        );

    const monthMap = new Map<string, { scope1: number; scope2: number; scope3: number }>();

    for (const row of rows) {
        const current = monthMap.get(row.month) ?? { scope1: 0, scope2: 0, scope3: 0 };
        const amount = Number(row.amount);

        if (row.scopeType === "SCOPE1") current.scope1 = amount;
        if (row.scopeType === "SCOPE2") current.scope2 = amount;
        if (row.scopeType === "SCOPE3") current.scope3 = amount;

        monthMap.set(row.month, current);
    }

    const months = getLastMonthKeys().map((month) => {
        const scopes = monthMap.get(month) ?? { scope1: 0, scope2: 0, scope3: 0 };
        const total = scopes.scope1 + scopes.scope2 + scopes.scope3;

        return {
            month,
            label: formatMonthLabel(month),
            scope1: scopes.scope1,
            scope2: scopes.scope2,
            scope3: scopes.scope3,
            total,
        };
    });

    return {
        unit: "tCO2e",
        months,
    };
}
