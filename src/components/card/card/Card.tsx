import { Box, Text } from 'native-base';
import React from 'react';
import { CardProps } from '../../../types'; 

const Card: React.FC<CardProps> = ({item}) => {
    return (
        <Box padding={3} borderBottomWidth={1} borderBottomColor="gray.300">
            <Text>{item.name}</Text>
        </Box>
    )
}

export default Card;
