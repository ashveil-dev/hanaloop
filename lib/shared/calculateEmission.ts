export function calculateEmission(
    amount: string | number,
    factor: string | number
): number {
    return Number(amount) * Number(factor);
}

export function formatEmission(value: number, decimals = 2): string {
    return value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}
