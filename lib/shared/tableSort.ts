export type SortDirection = "asc" | "desc";

export type SortRule = {
    field: string;
    direction: SortDirection;
};

export function compareStrings(a: string, b: string): number {
    return a.localeCompare(b, "ko");
}

export function compareNumbers(a: number, b: number): number {
    return a - b;
}

export function compareDates(a: string | Date, b: string | Date): number {
    return new Date(a).getTime() - new Date(b).getTime();
}
