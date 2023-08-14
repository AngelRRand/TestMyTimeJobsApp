import { Box, Text, FlatList, Heading, VStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../redux';
import Layoud from '../components/container/Layoud';
import { BeerCart } from '../types';
import CardCart from '../components/card/cardCart/CardCart';
import { myActions } from '../redux/reducers/products';
import { Pressable } from 'react-native';


const CartScreen = () => {
	const Beers = useSelector((state: RootState) => state.products.ProductsCart);
	const [total, setTotal] = useState(0);
	const dispatch: Dispatch = useDispatch();

	useEffect(() => {
		const newTotal = Beers.reduce((acc, beer) => acc + beer.cost * beer.count, 0);
		setTotal(newTotal);
	}, [Beers]);

	const handleClearCart = () => {
		dispatch(myActions.clearCart());
	};
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

							<Text textAlign={"center"} mt="3" mb="5" fontSize={25}>Total: ${total.toFixed(2)}</Text>
							<Pressable onPress={() => handleClearCart()}>
								<Box bg="#800040" w="100%" h={50} mt={4} mb={4} p={1} justifyContent={"center"}>
									<Text textAlign={"center"} fontSize={20} color={"white"}>Pagar</Text>
								</Box>
							</Pressable>
						</>
				}
			</Box>
		</Layoud>
	)
}

export default CartScreen