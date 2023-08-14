import { HStack, IconButton, Button, StatusBar, Input, Box, Modal, useDisclose } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalFilter from './ModalFilter';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../../redux';
import React, { useState, useEffect } from 'react';
import { searchBeerByName } from '../../../redux/reducers/products';


const Header = () => {

    const { isOpen, onOpen, onClose } = useDisclose();
    const navigation: any = useNavigation();
    const dispatch: Dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        navigation.navigate('Detail');
        dispatch(searchBeerByName(searchValue));
    };
    return (
        <>
            <StatusBar barStyle="light-content" />
            <HStack px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" style={{ zIndex: 1 }}  >
                <IconButton onPress={onOpen} icon={<Icon name="bars" size={30} color="white" />} />
                <Box flex={1} mx={4}>
                    <Input
                        variant="outlined"
                        placeholder="Buscar..."
                        fontSize={15}
                        bg={"white"}
                        value={searchValue}
                        onChangeText={(text) => setSearchValue(text)}
                        InputRightElement={
                            <IconButton icon={<Icon name="search" size={20} color="#800040" />} onPress={handleSearch} />
                        }
                    />
                </Box>
            </HStack>

            <ModalFilter
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    )
}

export default Header