import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/navigation/types';
import {
  Card,
  ContentContainer,
  Description,
  HoleImage,
  HoleName,
  ImageContainer,
  NumberBadge,
  NumberText,
  Separator,
  StatText,
  StatsRow,
} from './styles';

const MAX_LINES = 4;

interface HoleCardProps {
  number: number;
  name: string;
  description: string;
  par: number;
  distance: number;
  imageUri?: string;
  truncate?: boolean;
  showBorder?: boolean;
}

export const HoleCard = ({
  number,
  name,
  description,
  par,
  distance,
  imageUri,
  truncate = true,
  showBorder = true,
}: HoleCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const defaultImage =
    'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=400&fit=crop';

  const handlePress = () => {
    if (!truncate) return; // Don't navigate if already in detail view
    navigation.navigate('HoleDetailModal', {
      number,
      name,
      description,
      par,
      distance,
      imageUri,
    });
  };

  return (
    <Card
      onPress={truncate ? handlePress : undefined}
      activeOpacity={truncate ? 0.8 : 1}
      disabled={!truncate}
      showBorder={showBorder}
    >
      <ImageContainer>
        <HoleImage source={{ uri: imageUri || defaultImage }} resizeMode="cover" />
        <NumberBadge>
          <NumberText>{number}</NumberText>
        </NumberBadge>
      </ImageContainer>
      <ContentContainer>
        <HoleName>{name}</HoleName>
        <Description numberOfLines={truncate ? MAX_LINES : undefined}>{description}</Description>
        <StatsRow>
          <StatText>Par {par}</StatText>
          <Separator>|</Separator>
          <StatText>{distance} yards</StatText>
        </StatsRow>
      </ContentContainer>
    </Card>
  );
};
