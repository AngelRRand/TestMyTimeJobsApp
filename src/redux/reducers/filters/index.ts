import { Beer } from '../../../types';
import { FilterState, Title } from '../../../types/filter';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import axios from 'axios';

const initialState:FilterState  = {
    Malts: [],
    Hops: []
};

const mySlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setAllMalts: (state, action: PayloadAction<Title[]>) => {
            state.Malts = action.payload;
        },
        setAllHops: (state, action: PayloadAction<Title[]>) => {
            state.Hops = action.payload;
        }
    },
});

export const { actions: myActions, reducer: filters } = mySlice;
export default mySlice.reducer;


export const fetchIngredients = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get('https://api.punkapi.com/v2/beers');
            let allMalts: Set<string> = new Set();
            let allHops: Set<string> = new Set();

            response.data.forEach((beer: Beer) => {
                beer.ingredients.malt.forEach(malt => {
                    allMalts.add(malt.name);
                });
                beer.ingredients.hops.forEach(hop => {
                    allHops.add(hop.name);
                });
            });

            const maltArray: Title[] = Array.from(allMalts).map(name => ({ name }));
            const hopsArray: Title[] = Array.from(allHops).map(name => ({ name }));

            dispatch(myActions.setAllMalts(maltArray));
            dispatch(myActions.setAllHops(hopsArray));
        } catch (error) {
            throw new Error('Error al obtener los ingredientes');
        }
    }
}