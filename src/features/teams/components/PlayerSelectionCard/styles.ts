import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

interface CardContainerProps {
  $isSelected: boolean;
}

export const CardContainer = styled.Pressable<CardContainerProps>`
  width: 110px;
  align-items: center;
  padding: 16px 12px;
  background-color: ${({ theme, $isSelected }: { theme: Theme; $isSelected: boolean }) =>
    $isSelected ? theme.colors.backgroundLight : theme.colors.card};
  border-radius: 16px;
  margin-right: 12px;
  border-width: 2px;
  border-color: ${({ theme, $isSelected }: { theme: Theme; $isSelected: boolean }) =>
    $isSelected ? theme.colors.primary : theme.colors.border};
  position: relative;
`;

export const SelectedIndicator = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const SelectedIndicatorText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const PlayerName = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  text-align: center;
  margin-top: 8px;
  min-height: 32px;
`;

export const CountryFlag = styled.Text`
  font-size: 16px;
  margin-top: 4px;
`;

export const CountryText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  margin-top: 2px;
`;
