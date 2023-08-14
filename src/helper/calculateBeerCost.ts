import { Beer } from "../types";

export function calculateBeerCost(beer: Beer) {
    let cost = 0;

    // Precio de ingredientes
    const maltPricePerKg = 1;
    const hopPricePerGram = 0.10;
    const yeastPrice = 2;

    for (const malt of beer.ingredients.malt) {
        cost += malt.amount.value * maltPricePerKg;
    }

    for (const hop of beer.ingredients.hops) {
        cost += hop.amount.value * hopPricePerGram;
    }

    cost += yeastPrice;

    // Modificación de precio por ABV
    const abvDifference = 5 - beer.abv;
    if (abvDifference > 0) {
        cost -= abvDifference * 0.50;
    }

    // Modificación de precio por IBU (en este caso no afecta porque IBU es 60, pero lo incluyo por completitud)
    const ibuDifference = 60 - beer.ibu;
    if (ibuDifference > 0) {
        cost -= (ibuDifference / 10) * 0.25;
    }

    return cost;
}
