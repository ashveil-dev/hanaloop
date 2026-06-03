const CATEGORY_LABELS: Record<string, string> = {
    ELECTRICITY: "전기",
    GAS: "가스",
    FUEL: "연료",
    HEAT: "열/스팀",
    TRANSPORT: "운송",
    WASTE: "폐기물",
};

export function getFactorCategoryLabel(category: string): string {
    return CATEGORY_LABELS[category] ?? category;
}
