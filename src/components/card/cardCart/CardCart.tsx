import { Box, Heading, VStack, HStack, Image, Center, Text } from 'native-base';
import React from 'react'
import { CardPropsCart } from '../../../types'
import { Pressable } from 'native-base'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../../redux';
import { fetchBeerDetails, myActions } from '../../../redux/reducers/products';

const CardCart: React.FC<CardPropsCart> = ({ item }) => {


    const navigation: any = useNavigation();
    const dispatch: Dispatch = useDispatch();

    const handleCardPress = () => {
        dispatch(fetchBeerDetails(item.id));
        navigation.navigate('Detail');
    }
    const deletItem = () => {
        dispatch(myActions.removeFromCart(item.id))
    }


    return (
        <Pressable onPress={() => handleCardPress()} mt={4}>

            <Box w="100%">
                <HStack w="100%" h={180} alignItems={"center"} >
                    <Image
                        src={item?.image_url}
                        alt={item?.name}
                        w={100}
                        h={140}
                        resizeMode="contain"
                    />
                    <VStack>
                        <Heading isTruncated size="lg" h={10}>{item.count} - {item.name}</Heading>
                        <Text w={"65%"}>{item.tagline}</Text>
                        <Text fontSize={20} w={"65%"}>$ {item.cost}</Text>

                    </VStack>
                    <Pressable marginLeft="auto" onPress={() => deletItem()}>

                        <Box  bg="#800040" w={20} h="100%" justifyContent={"center"}>
                            <Text textAlign={"center"} color="white" borderBottomColor="#800040" borderBottomWidth={4}>Eliminar</Text>
                        </Box>
                    </Pressable>
                </HStack>
            </Box>
        </Pressable>
    )
}

export default CardCart