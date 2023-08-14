import { Box, HStack, ScrollView } from 'native-base';
import React from 'react';
import { ListCardData } from '../../../types'; 
import Card from './CardHome';

const CardList: React.FC<ListCardData> = ({ listCard = [] }) => (
  <Box width={"100%"} height={"auto"}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <HStack>
        {listCard?.map(beer => (
          <Card 
            key={beer.id} 
            id={beer.id} 
            name={beer.name} 
            image_url={beer.image_url}
            description={beer.description}
            cost={beer.cost}
          />
        ))}
      </HStack>
    </ScrollView>
  </Box>
);

export default CardList;
