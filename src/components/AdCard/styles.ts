import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Card = styled.View`
  width: 100%;
  border-radius: 16px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  overflow: hidden;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 180px;
  position: relative;
`;

export const AdImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const SponsorBadge = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  padding: 6px 12px;
  border-radius: 20px;
  gap: 6px;
`;

export const SponsorLogo = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

export const SponsorText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const ContentContainer = styled.View`
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  line-height: 20px;
  margin-bottom: 16px;
`;

export const VisitButton = styled.TouchableOpacity`
  align-self: flex-start;
`;

export const VisitButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;
