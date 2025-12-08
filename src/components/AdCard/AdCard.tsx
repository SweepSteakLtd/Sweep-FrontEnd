import { Linking } from 'react-native';
import {
  AdImage,
  Card,
  ContentContainer,
  Description,
  ImageContainer,
  SponsorBadge,
  SponsorLogo,
  SponsorText,
  Title,
  VisitButton,
  VisitButtonText,
} from './styles';

interface AdCardProps {
  name: string;
  description: string;
  website?: string;
  imageUri?: string;
}

export const AdCard = ({ name, description, website, imageUri }: AdCardProps) => {
  const defaultImage =
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop';

  const handleVisitWebsite = () => {
    if (website) {
      Linking.openURL(website);
    }
  };

  return (
    <Card>
      <ImageContainer>
        <AdImage source={{ uri: imageUri || defaultImage }} resizeMode="cover" />
        <SponsorBadge>
          <SponsorLogo>◬</SponsorLogo>
          <SponsorText>SPONSOR</SponsorText>
        </SponsorBadge>
      </ImageContainer>
      <ContentContainer>
        <Title>{name}</Title>
        <Description>{description}</Description>
        {website && (
          <VisitButton onPress={handleVisitWebsite} activeOpacity={0.8}>
            <VisitButtonText>Visit Website</VisitButtonText>
          </VisitButton>
        )}
      </ContentContainer>
    </Card>
  );
};
