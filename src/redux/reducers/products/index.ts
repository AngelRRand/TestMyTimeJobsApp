import { MyInitialState, Beer, CarouselBeer, BeerCart } from '../../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import axios from 'axios';
import { calculateBeerCost } from '../../../helper/calculateBeerCost';

const initialState: MyInitialState = {
    ProductsCarousel: [],
    ProductsHomeMalta: [],
    ProductsHomeHops: [],
    CurrentBeerDetails: null,
    Beers: [],
    ProductsCart: []
};

const mySlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getCarouselProducts: (state, action: PayloadAction<CarouselBeer[]>) => {
            state.ProductsCarousel = action.payload;
        },
        getHomeMalt: (state, action: PayloadAction<Beer[]>) => {
            state.ProductsHomeMalta = action.payload;
        },
        getHomeHops: (state, action: PayloadAction<Beer[]>) => {
            state.ProductsHomeHops = action.payload;
        },
        getBeerDetails: (state, action: PayloadAction<Beer>) => {
            state.CurrentBeerDetails = action.payload;
        },
        getBeer: (state, action: PayloadAction<Beer[]>) => {
            const uniqueBeers = action.payload.filter(beer => !state.Beers.some(b => b.id === beer.id));
            state.Beers = [...state.Beers, ...uniqueBeers];
        },
        addToCart: (state, action: PayloadAction<BeerCart>) => {
            const existingBeer = state.ProductsCart.find(beer => beer.id === action.payload.id);

            if (existingBeer) {
                existingBeer.count += 1;
            } else {
                state.ProductsCart.push({ ...action.payload, count: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.ProductsCart = state.ProductsCart.filter(beer => beer.id !== action.payload);
        },
        clearCart: (state) => {
            state.ProductsCart = [];
        },
        searchBeerResult: (state, action: PayloadAction<Beer>) => {
            state.CurrentBeerDetails = action.payload;
        },
    },
});

export const { actions: myActions, reducer: products } = mySlice;
export default mySlice.reducer;


export const fetchProductsCarousel = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get('https://api.punkapi.com/v2/beers?per_page=5');
            let transformedData: CarouselBeer[] = response.data.map((beer: Beer) => {
                return {
                    id: beer.id,
                    image_url: beer.image_url,
                    cost: parseFloat(calculateBeerCost(beer).toFixed(2))
                };
            });

            transformedData.sort((a, b) => a.cost - b.cost);

            dispatch(myActions.getCarouselProducts(transformedData));
        } catch (error) {
            throw new Error('Error todo mal capo')
        }
    }
}


export const fetchProductsMalt = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get('https://api.punkapi.com/v2/beers?malt=Munich&per_page=5');

            let transformedData: Beer[] = response.data;

            dispatch(myActions.getHomeMalt(transformedData));
        } catch (error) {
            throw new Error('Error al obtener los productos de inicio');
        }
    }
}

export const fetchProductsHops = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get('https://api.punkapi.com/v2/beers?hops=Simcoe&per_page=5');

            let transformedData: Beer[] = response.data;

            dispatch(myActions.getHomeHops(transformedData));
        } catch (error) {
            throw new Error('Error al obtener los productos de inicio');
        }
    }
}

export const fetchBeerDetails = (beerId: number) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`https://api.punkapi.com/v2/beers/${beerId}`);
            const beerDetails = response.data[0];
            /* Usar calculateBeerCost  */
            const cost = parseFloat(calculateBeerCost(beerDetails).toFixed(2));
            const transformedBeerDetails = {
                ...beerDetails,
                cost: cost
            };
            dispatch(myActions.getBeerDetails(transformedBeerDetails));
        } catch (error) {
            throw new Error('Error al obtener detalles de la cerveza');
        }
    }
}

export const fetchFilteredProducts = (
    ingredient: string,
    alcoholRange: { min: string, max: string },
    bitternessRange: { min: string, max: string },
    page: number
) => {
    return async (dispatch: Dispatch) => {
        try {
            let query = '';

            if (ingredient) query += `&${ingredient}`;
            if (alcoholRange.min && alcoholRange.max) query += `&abv_gt=${alcoholRange.min}&abv_lt=${alcoholRange.max}`;
            if (bitternessRange.min && bitternessRange.max) query += `&ibu_gt=${bitternessRange.min}&ibu_lt=${bitternessRange.max}`;

            const response = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=5${query}`);

            let transformedData: Beer[] = response.data.map((beer: Beer) => {
                return {
                    id: beer.id,
                    image_url: beer.image_url,
                    cost: parseFloat(calculateBeerCost(beer).toFixed(2)),
                    tagline: beer.tagline,
                    name: beer.name
                };
            });

            dispatch(myActions.getBeer(transformedData));

        } catch (error) {
            throw new Error('Error al obtener productos filtrados');
        }
    }
}

export const searchBeerByName = (beerName: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`https://api.punkapi.com/v2/beers?beer_name=${beerName.replace(/\s+/g, '_')}`);

            const foundBeer = response.data[0];

            const cost = parseFloat(calculateBeerCost(foundBeer).toFixed(2));

            const transformedBeerDetails = {
                ...foundBeer,
                cost: cost
            };

            // Despachar los resultados a la tienda Redux
            dispatch(myActions.searchBeerResult(transformedBeerDetails));
        } catch (error) {
            throw new Error('Error al buscar la cerveza por su nombre');
        }
    }
}