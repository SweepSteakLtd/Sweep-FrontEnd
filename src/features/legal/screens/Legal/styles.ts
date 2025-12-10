import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 20px;
`;

export const MenuSection = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  border-radius: 12px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const MenuItemText = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const MenuItemArrow = styled.Text`
  font-size: 24px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;
