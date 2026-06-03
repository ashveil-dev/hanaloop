export const DEFAULT_PAGE_SIZE = 10;

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
}

export function getTotalPages(totalItems: number, pageSize: number): number {
    if (totalItems === 0) return 1;
    return Math.ceil(totalItems / pageSize);
}

export function getPageRange(
    page: number,
    pageSize: number,
    totalItems: number
): { start: number; end: number } {
    if (totalItems === 0) return { start: 0, end: 0 };
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalItems);
    return { start, end };
}
