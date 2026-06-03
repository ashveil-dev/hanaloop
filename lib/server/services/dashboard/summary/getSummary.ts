import { getHierarchy } from "@/lib/server/services/dashboard/hierarchy/getHierarchy"
import { db } from "@/lib/server/db";
import { GroupsTable } from "@/lib/server/db/schema/groups";
import { isNull } from "drizzle-orm";
import { CARBON_TAX_RATE, calculateCarbonTax } from "@/lib/shared/carbonTax";

export { CARBON_TAX_RATE };
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
            carbonTax: calculateCarbonTax(hierarchy.totalEmission.scope1),
            riskLevel: getRiskLevel(hierarchy.totalEmission.scope1)
        },
        scope2: {
            amount: hierarchy.totalEmission.scope2,
            carbonTax: calculateCarbonTax(hierarchy.totalEmission.scope2),
            riskLevel: getRiskLevel(hierarchy.totalEmission.scope2)
        },
        scope3: {
            amount: hierarchy.totalEmission.scope3,
            carbonTax: calculateCarbonTax(hierarchy.totalEmission.scope3),
            riskLevel: getRiskLevel(hierarchy.totalEmission.scope3)
        },
        total: {
            amount: hierarchy.totalEmission.total,
            carbonTax: calculateCarbonTax(hierarchy.totalEmission.total),
            riskLevel: getRiskLevel(hierarchy.totalEmission.total)
        },
    }
}
