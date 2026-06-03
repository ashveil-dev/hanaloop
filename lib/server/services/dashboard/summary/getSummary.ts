import { getHierarchy } from "@/lib/server/services/dashboard/hierarchy/getHierarchy"
import { db } from "@/lib/server/db";
import { GroupsTable } from "@/lib/server/db/schema/groups";
import { isNull } from "drizzle-orm";

export const CARBON_TAX_RATE = 14500;
export const RISK_THRESHOLDS = {
    LOW: 1000,
    MEDIUM: 5000,
    HIGH: 10000,
}

type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

function getRiskLevel(amount: number): RiskLevel {
    if (amount >= RISK_THRESHOLDS.HIGH) return "CRITICAL"
    if (amount >= RISK_THRESHOLDS.MEDIUM) return "HIGH"
    if (amount >= RISK_THRESHOLDS.LOW) return "MEDIUM"
    return "LOW"
}

export async function getSummary() {
    const result = await db
        .select({ id: GroupsTable.id })
        .from(GroupsTable)
        .where(isNull(GroupsTable.parentId));

    const hierarchy = await getHierarchy({ id: result[0].id });

    return {
        name: hierarchy.name,
        unit: hierarchy.unit,
        scope1: {
            amount: hierarchy.totalEmission.scope1,
            carbonTax: hierarchy.totalEmission.scope1 * CARBON_TAX_RATE,
            riskLevel: getRiskLevel(hierarchy.totalEmission.scope1)
        },
        scope2: {
            amount: hierarchy.totalEmission.scope2,
            carbonTax: hierarchy.totalEmission.scope2 * CARBON_TAX_RATE,
            riskLevel: getRiskLevel(hierarchy.totalEmission.scope2)
        },
        scope3: {
            amount: hierarchy.totalEmission.scope3,
            carbonTax: hierarchy.totalEmission.scope3 * CARBON_TAX_RATE,
            riskLevel: getRiskLevel(hierarchy.totalEmission.scope3)
        },
        total: {
            amount: hierarchy.totalEmission.total,
            carbonTax: hierarchy.totalEmission.total * CARBON_TAX_RATE,
            riskLevel: getRiskLevel(hierarchy.totalEmission.total)
        },
    }
}
