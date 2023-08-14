import { Beer } from '../../../types';
import { FilterState, Malt } from '../../../types/filter';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import axios from 'axios';

const initialState:FilterState  = {
    Malts: [],
};

const mySlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setAllMalts: (state, action: PayloadAction<Malt[]>) => {
            state.Malts = action.payload;
        }
    },
});

export const { actions: myActions, reducer: filters } = mySlice;
export default mySlice.reducer;

export const fetchAllMalts = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get('https://api.punkapi.com/v2/beers'); 
            let allMalts: Set<string> = new Set();

            response.data.forEach((beer: Beer) => {
                beer.ingredients.malt.forEach(malt => {
                    allMalts.add(malt.name);
                });
            });

            const maltArray: Malt[] = Array.from(allMalts).map(name => ({ name }));

            dispatch(myActions.setAllMalts(maltArray));
        } catch (error) {
            throw new Error('Error al obtener las maltas');
        }
    }
}