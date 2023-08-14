import { HStack, IconButton, Button, StatusBar, Input, Box, Modal, useDisclose } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalFilter from './ModalFilter';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../../redux';
import { useEffect } from 'react';
import { fetchAllMalts } from '../../../redux/reducers/filters';

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const malts = useSelector((state: RootState) => state.filters.Malts);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllMalts());

    }, [dispatch]);


    
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
                        InputRightElement={
                            <IconButton icon={<Icon name="search" size={20} color="#800040" />} />
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