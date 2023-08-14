import React from 'react';
import { Box, HStack, Image, Pressable, Text } from 'native-base';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { CarouselBeers, CarouselBeer } from '../../types';
import { fetchBeerDetails } from '../../redux/reducers/products';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../redux';

const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = ({ productsCarousel }: { productsCarousel: CarouselBeers }) => {


    const dispatch: Dispatch = useDispatch();
    const handleCardPress = (id: number) => {
        dispatch(fetchBeerDetails(id));
    }

    const renderItem = ({ item }: { item: CarouselBeer }) => {
        return (
            <Pressable onPress={() => handleCardPress(item.id)}>
                <Box
                    bg="white"
                    borderRadius="lg"
                    height={250}
                    justifyContent="center"
                    alignItems="center"
                    width={screenWidth - 180}
                    shadow={2}
                    p="5"
                >
                    <Image
                        alt="Carousel item image"
                        source={{ uri: item.image_url }}
                        width="20%"
                        height="90%"
                    />
                    <Text fontSize="2xl">$ {item.cost}</Text>
                </Box>
            </Pressable>
        );
    };

    return (
        <HStack
            width={screenWidth}
            justifyContent="center"
            alignItems="center"
            mt={5}
            mb={5}
        >
            <Carousel
                data={productsCarousel.listcarousel}
                sliderWidth={screenWidth}
                itemWidth={screenWidth - 180}
                renderItem={renderItem}
                autoplay={true}
                loop={true}
                autoplayInterval={2500}
            />
        </HStack>
    );
};

export default MyCarousel;

