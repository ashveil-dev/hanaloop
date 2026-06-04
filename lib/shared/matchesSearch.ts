export function matchesSearch(
    query: string,
    ...values: (string | number | null | undefined)[]
): boolean {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return true;

    return values.some((value) =>
        String(value ?? "")
            .toLowerCase()
            .includes(keyword)
    );
}
