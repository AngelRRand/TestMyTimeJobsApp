import { Box, Text, FlatList, Heading } from 'native-base';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../redux';
import Layoud from '../components/container/Layoud';
import Card from '../components/card/card/Card';
import { BeerProduct } from '../types';
import { fetchFilteredProducts } from '../redux/reducers/products';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Products: {
    ingredient: string;
    alcoholRange: { min: string; max: string };
    bitternessRange: { min: string; max: string };
  };
};

type ProductsScreenRouteProp = RouteProp<RootStackParamList, 'Products'>;

interface ProductsScreenProps {
    route: ProductsScreenRouteProp;
  }


const ProductsScreen: React.FC<ProductsScreenProps> = ({route}) => {
    const Beers = useSelector((state: RootState) => state.products.Beers);
    const dispatch: Dispatch = useDispatch();
    const [page, setPage] = useState(3);
    const { ingredient, alcoholRange, bitternessRange } = route.params;

    const loadMoreBeers = () => {
        setPage(prevPage => prevPage + 1); 
        dispatch(fetchFilteredProducts(ingredient, alcoholRange, bitternessRange, page));
    }
    return (
        <Layoud>
            <Box bg="white" minW="100%">
                <FlatList<BeerProduct>
                    data={Beers}
                    renderItem={({ item }) => <Card item={item} />}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={loadMoreBeers}  
                    onEndReachedThreshold={0.5}
                />
            </Box>
        </Layoud>
    )
}

export default ProductsScreen;
