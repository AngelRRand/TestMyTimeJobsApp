import React, { useEffect } from 'react'
import Layoud from '../components/container/Layoud'
import { ScrollView, Text, Heading, Center, Box, Button, Modal, Image, useDisclose, Pressable } from 'native-base'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Dispatch } from '../redux';
import { myActions } from '../redux/reducers/products';
import { BeerCart } from '../types';

const DetailsScreen = () => {


	const CurrentBeerDetails = useSelector((state: RootState) => state.products.CurrentBeerDetails);
	const dispatch: Dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclose();

	const addCart = () => {

		if (!CurrentBeerDetails) return;

		let obj: BeerCart = {
			image_url: CurrentBeerDetails?.image_url,
			name: CurrentBeerDetails?.name,
			id: CurrentBeerDetails?.id,
			tagline: CurrentBeerDetails?.tagline,
			cost: CurrentBeerDetails?.cost,
			count: 1
		}

		dispatch(myActions.addToCart(obj))
	}
	return (
		<Layoud>
			<ScrollView>
				<Heading size="xl" color="white" textAlign="center">{CurrentBeerDetails?.name}</Heading>
				<Box backgroundColor="white" flex={1} padding={4} borderTopLeftRadius={55} borderTopRightRadius={55} marginTop={3}>

					<Center>
						<Text style={{ fontSize: 20 }} mt={5} color="#800040">Lema: {CurrentBeerDetails?.tagline}</Text>
						<Text color="black" m={5} textAlign="center">Descripción: {CurrentBeerDetails?.description}</Text>

						<Pressable onPress={onOpen}>

							<Box
								width={200}
								height={450}
								style={{ position: "relative" }}
							>

								{CurrentBeerDetails?.image_url ? (
									<Image
										src={CurrentBeerDetails?.image_url}
										alt={CurrentBeerDetails?.name}
										w="100%"
										h="100%"
										resizeMode="contain"
										mb={10}
									/>
								) : (
									<Text>Imagen no disponible</Text>
								)}
								<Heading
									size="lg"
									color="white"
									marginTop={3}
									textAlign="center"
									p={2}
									bg="#800040"
									borderWidth={1}

									rounded={20}
									style={{
										position: "absolute",
										right: -100,
										top: 100,
										transform: [{ rotate: '45deg' }]
									}}
								>¡Ver ingredientes!</Heading>
								<Heading
									size="3xl"
									color="#800040"
									marginTop={3}
									textAlign="center"
									p={1}
									bg="white"
									borderWidth={2}
									rounded={10}
									style={{
										position: "absolute",
										left: -70,
										bottom: 50,
										transform: [{ rotate: '-35deg' }]
									}}
								>$ {CurrentBeerDetails?.cost}</Heading>
							</Box>
						</Pressable>

						<Text color="black">Nivel de Alcohol: {CurrentBeerDetails?.abv}</Text>
						<Text color="black">Amargura: {CurrentBeerDetails?.ibu}</Text>

						<Pressable onPress={() => addCart()}>

							<Box bg="#800040" w="100%" h={50} mt={4} mb={4} p={1} rounded={10}>
								<Text textAlign="center" fontSize={25} color="white">Añadir al carrito</Text>
							</Box>
						</Pressable>
					</Center>
				</Box>
				<Modal isOpen={isOpen} onClose={onClose}>
					<Modal.Content >
						<Modal.CloseButton />
						<Modal.Header>Ingredientes</Modal.Header>
						<Modal.Body>
							<Heading size="xs" color="black" marginTop={2} textAlign="center">Maltas:</Heading>
							{CurrentBeerDetails?.ingredients.malt.map((malt, index) => (
								<Text key={index} color="black" textAlign="center">{malt.name} - {malt.amount.value} {malt.amount.unit}</Text>
							))}
							<Heading size="xs" color="black" marginTop={2} textAlign="center">Lúpulos:</Heading>
							{CurrentBeerDetails?.ingredients.hops.map((hop, index) => (
								<Text key={index} color="black" textAlign="center">{hop.name} - {hop.amount.value} {hop.amount.unit} ({hop.add} - {hop.attribute})</Text>
							))}
						</Modal.Body>
						<Modal.Footer>
							<Button variant="ghost" onPress={onClose}>Cerrar</Button>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
			</ScrollView>
		</Layoud>


	)
}

export default DetailsScreen