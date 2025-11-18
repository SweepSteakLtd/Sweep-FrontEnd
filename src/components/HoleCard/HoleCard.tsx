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

interface HoleCardProps {
  number: number;
  name: string;
  description: string;
  par: number;
  distance: number;
  imageUri?: string;
}

export const HoleCard = ({ number, name, description, par, distance, imageUri }: HoleCardProps) => {
  const defaultImage =
    'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=400&fit=crop';

  return (
    <Card>
      <ImageContainer>
        <HoleImage source={{ uri: imageUri || defaultImage }} resizeMode="cover" />
        <NumberBadge>
          <NumberText>{number}</NumberText>
        </NumberBadge>
      </ImageContainer>
      <ContentContainer>
        <HoleName>{name}</HoleName>
        <Description>{description}</Description>
        <StatsRow>
          <StatText>Par {par}</StatText>
          <Separator>|</Separator>
          <StatText>{distance} yards</StatText>
        </StatsRow>
      </ContentContainer>
    </Card>
  );
};
