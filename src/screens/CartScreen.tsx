import { Box, Text, FlatList, Heading, VStack } from 'native-base';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../redux';
import Layoud from '../components/container/Layoud';
import { BeerCart } from '../types';
import CardCart from '../components/card/cardCart/CardCart';


const CartScreen = () => {
	const Beers = useSelector((state: RootState) => state.products.ProductsCart);

	return (
		<Layoud>
			<Box bg="white" minW="100%">
				{
					Beers.length === 0 ?
						<Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

							<Text fontSize={20} textAlign={"center"}>No tienes ningun producto en el carrito</Text>
						</Box>
						:
						<>
							<Heading textAlign={"center"} mb="5" mt="5" fontSize={35}>Tu carrito</Heading>

								<FlatList<BeerCart>
									data={Beers}
									renderItem={({ item }) => <CardCart item={item} />}
									keyExtractor={item => item.id.toString()}
								/>
						</>

				}
			</Box>
		</Layoud>
	)
}

export default CartScreen