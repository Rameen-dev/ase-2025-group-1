// These are the default assumptions used for sustainability calculations.
// Keeping them in one place ensures consistency and transparency for when displaying impact data to all users.
export const IMPACT_DEFAULTS = {
    // Average weight (kg) of one clothing item.
    KG_PER_ITEM: 0.5,

    // Estimated CO2 saved per kilogram of reused clothing.
    CO2_PER_KG: 3.6,

    // Number of items needed to support one person
    ITEMS_PER_PERSON: 10,
};

// If our research improves, this makes it easier for us to adjust the sustainability model.

// Below we have a function that calculates the sustainability impact based on item count.
// It doesn't depend on who the user is.
export function calculateImpact(
    totalItems: number,
    overrides?: Partial<typeof IMPACT_DEFAULTS>
) {
    // This function only needs how many items, nothing else which makes it reusable.
    
    // Here we merge default assumptions with any overrides
    // Different charities could use different assumptions later
    const cfg = {...IMPACT_DEFAULTS, ...overrides};

    // Total Kilograms of clothing diverted from landfull
    const kgDiverted = totalItems * cfg.KG_PER_ITEM;

    // Estimated CO2 savings from reusing clothing
    const co2Saved = kgDiverted * cfg.CO2_PER_KG;

    // Estimated number of people supported
    // Math.floor avoids fractional people
    const peopleSupported = Math.floor(
        totalItems / cfg.ITEMS_PER_PERSON
    );

    return {
        totalItems,
        kgDiverted,
        co2Saved,
        peopleSupported,
    };
}