import { MyInitialState, Beer, CarouselBeer } from '../../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import axios from 'axios';
import { calculateBeerCost } from '../../../helper/calculateBeerCost';

const initialState: MyInitialState = {
    ProductsCarousel: [],
    ProductsHomeMalta:[],
    ProductsHomeHops:[],
    CurrentBeerDetails: null
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
        }
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
            const response = await axios.get('https://api.punkapi.com/v2/beers?malt=Munich&per_page=10');
            
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
            const response = await axios.get('https://api.punkapi.com/v2/beers?hops=Simcoe&per_page=10');
            
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
            console.log(beerDetails)
            dispatch(myActions.getBeerDetails(beerDetails)); 
        } catch (error) {
            throw new Error('Error al obtener detalles de la cerveza');
        }
    }
}