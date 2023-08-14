import { Box, Heading, VStack, HStack, Image, Center, Text } from 'native-base';
import React from 'react';
import { BeerCart, CardProps } from '../../../types';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchBeerDetails, myActions } from '../../../redux/reducers/products';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../../redux';

const Card: React.FC<CardProps> = ({ item }) => {


    const navigation: any = useNavigation();
    const dispatch: Dispatch = useDispatch();

    const handleCardPress = () => {
        dispatch(fetchBeerDetails(item.id));
        navigation.navigate('Detail');
    }

    const addCart = () => {

		if(!item) return; 

		let obj:BeerCart = {
			image_url: item?.image_url,
			name: item?.name,
			id: item?.id,
			tagline: item?.tagline,
			cost: item?.cost,
			count: 1
		}
		
		dispatch(myActions.addToCart(obj))
	}


    return (
        <Box mb={5} w="100%" >
            <Pressable onPress={() => handleCardPress()}>

                <HStack w="80%" h={180} alignItems={"center"} justifyContent={"center"}>
                    <Image
                        src={item?.image_url}
                        alt={item?.name}
                        w={140}
                        h={140}
                        resizeMode="contain"
                    />
                    <VStack>
                        <Heading size="lg" h={10}>{item.name}</Heading>
                        <Text w={"65%"}>{item.tagline}</Text>
                        <Text fontSize={20} w={"65%"}>{item.cost}</Text>

                    </VStack>
                </HStack>
            </Pressable>
            <Pressable onPress={()=> addCart()}>

                <Box bg="#800040" w="100%" h="10" justifyContent={"center"}>
                    <Text textAlign={"center"} color="white" borderBottomColor="#800040" borderBottomWidth={4}>Añadir al carrito</Text>
                </Box>
            </Pressable>
        </Box>
    )
}

export default Card;
