interface IngredientAmount {
    value: number;
    unit: string;
}

interface Malt {
    name: string;
    amount: IngredientAmount;
}

interface Hop {
    name: string;
    amount: IngredientAmount;
    add: string; 
    attribute: string; 
}

interface Ingredients {
    malt: Malt[];
    hops: Hop[];
}


export interface Beer {
    id: number;
    name: string;
    tagline: string;
    description: string;
    image_url: string;
    ingredients: Ingredients;
    abv: number;
    ibu: number;
    cost:number;
}

export interface CardHomeBeer {
    id: number;
    name: string;
    description: string;
    image_url: string;
    cost:number;
}

export interface MyInitialState {
    ProductsCarousel: CarouselBeer[]
    ProductsHomeMalta: CardHomeBeer[]
    ProductsHomeHops: CardHomeBeer[]
    ProductsCart: BeerCart[]
    CurrentBeerDetails: Beer | null
    Beers: Beer[]
}

export interface ListCardData {
    listCard: CardHomeBeer[];
};

export interface CarouselBeer {
    id: number;
    image_url: string;
    cost:number;
}

export interface CarouselBeers {
    listcarousel: CarouselBeer[];
}

export interface BeerProduct {
    id: number;
    name: string;
    image_url: string;
    cost:number;
    tagline: string;

}

export interface CardProps {
    item: BeerProduct;
}

export interface BeerCart {
    id: number;
    name: string;
    image_url: string;
    cost:number;
    tagline: string;
    count:number
}
export interface CardPropsCart {
    item: BeerCart;
}
 