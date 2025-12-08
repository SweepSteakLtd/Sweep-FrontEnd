import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { HoleCard } from '~/components/HoleCard/HoleCard';
import type { RootStackParamList } from '~/navigation/types';
import { CloseButton, CloseButtonText, Container, ContentContainer } from './styles';

type HoleDetailModalRouteProp = RouteProp<RootStackParamList, 'HoleDetailModal'>;

export const HoleDetailModal = () => {
  const navigation = useNavigation();
  const route = useRoute<HoleDetailModalRouteProp>();

  const { number, name, description, par, distance, imageUri } = route.params;

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <ContentContainer>
        <CloseButton onPress={handleClose} activeOpacity={0.7}>
          <CloseButtonText>✕</CloseButtonText>
        </CloseButton>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HoleCard
            number={number}
            name={name}
            description={description}
            par={par}
            distance={distance}
            imageUri={imageUri}
            truncate={false}
            showBorder={false}
          />
        </ScrollView>
      </ContentContainer>
    </Container>
  );
};
