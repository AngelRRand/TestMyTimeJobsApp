import { Box, Image, Text, VStack, Center, Pressable } from 'native-base';
import React from 'react';
import { CardHomeBeer } from '../../../types';
import { useDispatch } from 'react-redux';
import { fetchBeerDetails } from '../../../redux/reducers/products';
import { Dispatch } from '../../../redux';
import { useNavigation } from '@react-navigation/native';

const Card: React.FC<CardHomeBeer> = ({ id, name, image_url, cost }) => {
  const dispatch: Dispatch = useDispatch();
  const navigation: any = useNavigation();

  const handleCardPress = () => {
    dispatch(fetchBeerDetails(id));
    navigation.navigate('Detail'); 
  }

  return (
    <Pressable onPress={handleCardPress}>
      <Box key={id} width={200} m={2} borderRadius="md">
        <Center>
          <Image
            source={{ uri: image_url }}
            alt={name}
            width={10}
            height={170}
            borderTopLeftRadius="md"
            borderTopRightRadius="md"
          />
          <VStack p={4} space={2} justifyContent={"center"} alignItems={"center"}>
            <Text fontWeight="bold">{name}</Text>
          </VStack>
        </Center>
      </Box>
    </Pressable>
  );
}
export default Card