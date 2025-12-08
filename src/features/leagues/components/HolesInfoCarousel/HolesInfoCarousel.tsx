import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { AdCard } from '~/components/AdCard/AdCard';
import { HoleCard } from '~/components/HoleCard/HoleCard';
import type { CarouselItem } from '../../hooks/useLeague';
import { Container, Title } from './styles';

type HolesInfoCarouselProps = {
  tournamentName?: string;
  carouselData: CarouselItem[];
};

export const HolesInfoCarousel = ({ tournamentName, carouselData }: HolesInfoCarouselProps) => {
  const width = Dimensions.get('window').width;

  if (!tournamentName || carouselData.length === 0) {
    return null;
  }

  return (
    <Container>
      <Title>Iconic Holes of {tournamentName}</Title>
      <FlatList
        horizontal
        data={carouselData}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={{ width: width * 0.75, paddingHorizontal: 8 }}>
            {item.type === 'hole' ? (
              <HoleCard
                number={item.data.position || 0}
                name={item.data.name || ''}
                description={item.data.description || ''}
                par={item.data.par || 0}
                distance={item.data.distance || 0}
                imageUri={item.data.cover_image}
              />
            ) : (
              <AdCard
                name={item.data.name || ''}
                description={item.data.description || ''}
                website={item.data.website}
              />
            )}
          </View>
        )}
      />
    </Container>
  );
};
