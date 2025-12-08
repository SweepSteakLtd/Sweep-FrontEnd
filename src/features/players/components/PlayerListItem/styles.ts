import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

interface ContainerProps {
  $isSelected: boolean;
}

export const Container = styled.Pressable<ContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ theme, $isSelected }: { theme: Theme; $isSelected: boolean }) =>
    $isSelected ? theme.colors.backgroundLight : theme.colors.white};
  border-radius: 12px;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: ${({ theme, $isSelected }: { theme: Theme; $isSelected: boolean }) =>
    $isSelected ? theme.colors.primary : theme.colors.border};
  shadow-color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 2;
`;

export const Info = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const NameText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CountryFlag = styled.Text`
  font-size: 14px;
  margin-right: 6px;
`;

export const CountryText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`;

export const OddsText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-right: 8px;
`;
