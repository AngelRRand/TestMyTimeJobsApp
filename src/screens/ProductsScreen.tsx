import { Box, Text, FlatList } from 'native-base';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../redux';
import Layoud from '../components/container/Layoud';
import Card from '../components/card/card/Card';
import { BeerProduct } from '../types';

const ProductsScreen = () => {
    const Beers = useSelector((state: RootState) => state.products.Beers);
    const dispatch: Dispatch = useDispatch();

    return (
        <Layoud>
            <FlatList<BeerProduct>
                data={Beers}
                renderItem={({ item }) => <Card item={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </Layoud>
    )
}

export default ProductsScreen;
