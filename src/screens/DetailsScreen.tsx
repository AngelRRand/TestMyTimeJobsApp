import React, { useEffect } from 'react'
import Layoud from '../components/container/Layoud'
import { ScrollView, Text, Heading, Center, Box, Button, Modal, Image, useDisclose, Pressable } from 'native-base'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Dispatch } from '../redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailsScreen = () => {


	const CurrentBeerDetails = useSelector((state: RootState) => state.products.CurrentBeerDetails);
	const dispatch: Dispatch = useDispatch();
	const navigation: any = useNavigation();
	const { isOpen, onOpen, onClose } = useDisclose();

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

								<Image
									src={CurrentBeerDetails?.image_url}
									alt={CurrentBeerDetails?.name}
									w="100%"
									h="100%"
									resizeMode="contain"
									mb={10}
								/>
								<Heading
									size="lg"
									color="white"
									marginTop={3}
									textAlign="center"
									p={2}
									bg="#800040"
									rounded={20}
									style={{
										position: "absolute",
										right: -100, // coloca el elemento completamente a la derecha
										top: 100, // ajuste según el diseño
										transform: [{ rotate: '45deg' }]
									}}
								>¡Ver ingredientes!</Heading>
							</Box>
						</Pressable>

						<Text color="black">Nivel de Alcohol: {CurrentBeerDetails?.abv}</Text>
						<Text color="black">Amargura: {CurrentBeerDetails?.ibu}</Text>

						<Box bg="#800040" w="100%" h="5%" mt={4} mb={4}>
							<Text textAlign="center" fontSize={25} color="white">Añadir a carrito</Text>
						</Box>
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