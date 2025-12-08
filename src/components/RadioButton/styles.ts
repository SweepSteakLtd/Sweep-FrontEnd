import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

export const RadioCircle = styled.View<{ selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${({ selected, theme }: { selected: boolean; theme: Theme }) =>
    selected ? theme.colors.primary : theme.colors.border};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const RadioDot = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;
