export const CARBON_TAX_RATE = 14500;

export function calculateCarbonTax(emissionAmount: number): number {
    return emissionAmount * CARBON_TAX_RATE;
}
