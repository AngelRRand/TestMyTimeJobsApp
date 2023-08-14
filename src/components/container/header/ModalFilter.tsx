import { HStack, VStack, Button, Heading, Input, Box, Modal, Text, Center, ScrollView, Pressable } from 'native-base'
import { ModalFilterProps } from '../../../types/app'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../../redux';
import { useEffect, useState } from 'react';
import { fetchIngredients } from '../../../redux/reducers/filters';
import { Title } from '../../../types/filter';
import { fetchFilteredProducts } from '../../../redux/reducers/products';
import { useNavigation } from '@react-navigation/native';

const ModalFilter: React.FC<ModalFilterProps> = ({ isOpen, onClose }) => {


	const navigation: any = useNavigation();
	const dispatch: Dispatch = useDispatch();
	const malts = useSelector((state: RootState) => state.filters.Malts);
	const hops = useSelector((state: RootState) => state.filters.Hops);
	const [ingredientModalOpen, setIngredientModalOpen] = useState(false);
	const [ingredientList, setIngredientList] = useState<Title[]>([]);
	const [nameFilter, setNameFilter] = useState("")

	const [selectedIngredient, setSelectedIngredient] = useState('');
	const [alcoholRange, setAlcoholRange] = useState({ min: '', max: '' });
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [bitternessRange, setBitternessRange] = useState({ min: '', max: '' });
	const [errorMessage2, setErrorMessage2] = useState<string | null>(null);

	const [errorMessage3, setErrorMessage3] = useState<string | null>(null);



	const toggleMalts = () => {
		setNameFilter("Maltas")
		setIngredientList(malts);
		setIngredientModalOpen(true);
	};

	const toggleHops = () => {
		setNameFilter("Lúpulo")
		setIngredientList(hops);
		setIngredientModalOpen(true);
	};

	const handleIngredientSelection = (name: string) => {
		setSelectedIngredient(name);
		setIngredientModalOpen(false);
		handleValueChange();
	};

	const handleAlcoholChange = (type: "min" | "max", value: string) => {
		let newValues = { ...alcoholRange, [type]: value };
		if (parseInt(newValues.min) >= parseInt(newValues.max)) {
			setAlcoholRange({ min: '', max: '' });
			setErrorMessage("El valor mínimo debe ser menor al máximo y el valor máximo mayor al mínimo.");
		} else {
			setAlcoholRange(newValues);
			setErrorMessage(null);
			handleValueChange();
		}
	};

	const handleBitternessChange = (type: "min" | "max", value: string) => {
		let newValues = { ...bitternessRange, [type]: value };
		if (parseInt(newValues.min) >= parseInt(newValues.max)) {
			setBitternessRange({ min: '', max: '' });
			setErrorMessage2("El valor mínimo debe ser menor al máximo y el valor máximo mayor al mínimo.");
		} else {
			setBitternessRange(newValues);
			setErrorMessage2(null);
			handleValueChange();
		}
	};

	const applyFilter = () => {

		if (!areInputsValid()) {
			setErrorMessage3("Por favor, ingrese al menos un criterio para filtrar.");
			return;
		}

		let ingredientQuery = '';
		if (selectedIngredient) {
			if (nameFilter === "Maltas") {
				ingredientQuery = `malt=${selectedIngredient}`;
			} else if (nameFilter === "Lúpulo") {
				ingredientQuery = `hops=${selectedIngredient}`;
			}
		}

		dispatch(fetchFilteredProducts(ingredientQuery, alcoholRange, bitternessRange, 1));
		onClose();
		navigation.navigate('Products', {
			ingredient: selectedIngredient,
			alcoholRange: alcoholRange,
			bitternessRange: bitternessRange,
		});
	}
	const areInputsValid = () => {
		if (selectedIngredient) return true;
		if (alcoholRange.min || alcoholRange.max) return true;
		if (bitternessRange.min || bitternessRange.max) return true;
		return false;
	};

	const handleValueChange = () => {
		if (areInputsValid()) {
			setErrorMessage3(null);
		}
	};

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content width="85%" height="90%">
					<Modal.CloseButton />
					<Modal.Header fontSize="4xl" fontWeight="bold" >
						<Heading size="xl" color="#800040">Filtrar</Heading>
					</Modal.Header>
					<Modal.Body>

						<Heading mt="3" mb="3" color="#800040">Ingrediente</Heading>
						<VStack space={3}>
							<HStack w="100%" justifyContent="space-evenly" >
								<Box>
									<Button
										bg="#800040"
										color="white"
										onPress={toggleMalts}
										colorScheme="default"
										w={150}
									>
										Malta
									</Button>
								</Box>

								<Box>
									<Button
										bg="#800040"
										color="white"
										onPress={toggleHops}
										colorScheme="default"
										w={150}
									>
										Lúpulo
									</Button>
								</Box>
							</HStack>
							<Input
								value={selectedIngredient}
								fontSize="xl"
								isReadOnly
								borderColor="#800040"
								variant="underlined"
							/>
						</VStack>

						<Heading textAlign="center" mt="10" mb="3" color="#800040">Cantidad de alcohol</Heading>

						{/* Añadir inputs */}
						<HStack w="100%" justifyContent="space-evenly">
							<VStack>
								<Text>Mínimo:</Text>
								<Input
									value={alcoholRange.min}
									onChangeText={(value) => handleAlcoholChange("min", value)}
									keyboardType="numeric"
									maxLength={2} // 3. Limitar a 2 caracteres
									borderColor="#800040"
									variant="underlined"
									textAlign="center"
									fontSize="xl"

								/>
							</VStack>

							<VStack>
								<Text>Máximo:</Text>
								<Input
									value={alcoholRange.max}
									onChangeText={(value) => handleAlcoholChange("max", value)}
									keyboardType="numeric"
									maxLength={2} // 3. Limitar a 2 caracteres
									borderColor="#800040"
									variant="underlined"
									textAlign="center"
									fontSize="xl"

								/>
							</VStack>
						</HStack>
						{errorMessage && <Text color="red.500" mt={2}>{errorMessage}</Text>}

						<Heading textAlign="center" mt="10" mb="3" color="#800040">Cantidad de amargura</Heading>
						<HStack w="100%" justifyContent="space-evenly">
							<VStack>
								<Text>Mínimo:</Text>
								<Input
									value={bitternessRange.min}
									onChangeText={(value) => handleBitternessChange("min", value)}
									keyboardType="numeric"
									maxLength={2}
									borderColor="#800040"
									variant="underlined"
									textAlign="center"
									fontSize="xl"
								/>
							</VStack>

							<VStack>
								<Text>Máximo:</Text>
								<Input
									value={bitternessRange.max}
									onChangeText={(value) => handleBitternessChange("max", value)}
									keyboardType="numeric"
									maxLength={2}
									borderColor="#800040"
									variant="underlined"
									textAlign="center"
									fontSize="xl"
								/>
							</VStack>
						</HStack>
						{errorMessage2 && <Text color="red.500" mt={2}>{errorMessage2}</Text>}
						{errorMessage3 && <Text color="red.500" mt={2}>{errorMessage3}</Text>}
					</Modal.Body>
					<Modal.Footer justifyContent="center">
						<Button w="100%" bg="#800040" onPress={applyFilter}>
							Filtrar
						</Button>
					</Modal.Footer>
				</Modal.Content>

				<Modal isOpen={ingredientModalOpen} onClose={() => setIngredientModalOpen(false)}>
					<Modal.Content width="50%" height="45%">
						<Modal.CloseButton />
						<Modal.Header fontSize="4xl" fontWeight="bold" >
							<Heading size="lg" color="#800040">{nameFilter}</Heading>
						</Modal.Header>
						<Modal.Body>
							<ScrollView>
								<VStack space={2}>
									{ingredientList.map((ingredient, i) => (
										<Pressable key={i} onPress={() => handleIngredientSelection(ingredient.name)}>
											<Text p={0.5} isTruncated key={ingredient.name}>{ingredient.name}</Text>
										</Pressable>
									))}
								</VStack>
							</ScrollView>
						</Modal.Body>
					</Modal.Content>
				</Modal>
			</Modal>
		</>
	);
}

export default ModalFilter;
