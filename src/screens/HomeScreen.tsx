import { useSelector, useDispatch } from 'react-redux';
import { Box, HStack, VStack, Text, Image, Heading, Center, AspectRatio, Stack } from 'native-base'
import React from 'react'
import { Dispatch, RootState } from '../redux';
import { fetchProductsCarousel, fetchProductsMalt, fetchProductsHops } from '../redux/reducers/products';
import { useEffect } from 'react';
import Layoud from '../components/container/Layoud';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyCarousel from '../components/carousel/Carousel';
import { ScrollView } from 'react-native';
import CardList from '../components/card/cardHome/ListCardHome';



const HomeScreen = () => {

	let nombre = "Horacio Rodriguez"
	let ubicacion = "Av no se cuantoooo"

	const productsCarousel = useSelector((state: RootState) => state.products.ProductsCarousel);
	const ProductsHomeMalta = useSelector((state: RootState) => state.products.ProductsHomeMalta);
	const ProductsHomeHops = useSelector((state: RootState) => state.products.ProductsHomeHops);
    const dispatch: Dispatch = useDispatch();


	useEffect(() => {
		dispatch(fetchProductsCarousel());
		dispatch(fetchProductsMalt());
		dispatch(fetchProductsHops());
	}, [dispatch]);


	return (
		<Layoud>
			<ScrollView>
				<HStack alignItems="center" p="5" space={0}>
					<VStack minW="70%" space={1}>
						<Heading size="md" color="gray.100">Bienvenido</Heading>
						<Heading size="md" color="gray.100">{nombre}</Heading>
						<Text color="gray.100" isTruncated maxW="100%"><Icon name="map" size={20} />  {ubicacion}</Text>
					</VStack>
					<Image
						source={{
							uri: "https://wallpaperaccess.com/full/317501.jpg"
						}}
						alt="Alternate Text"
						size="md"
						borderRadius={100}
						borderColor="gray.100"
						borderWidth={1}
					/>
				</HStack>

				<Box height={"100%"} minW={"100%"} borderTopLeftRadius={55} borderTopRightRadius={55} bg="white" overflow="hidden">
					<Center >

						<Heading p={4} size="xl" color="#460626">Conoce nuestras ofertas</Heading>


						<MyCarousel productsCarousel={{ listcarousel: productsCarousel }} />

						<Heading p={4} size="md" color="#460626">Maris (Malta)</Heading>

						<CardList listCard={ProductsHomeMalta} />

						<Heading p={4} size="md" color="#460626">Simcoe (Hops)</Heading>

						<CardList listCard={ProductsHomeHops} />

						
					</Center>
				</Box>

			</ScrollView>
		</Layoud>

	)
}

export default HomeScreen