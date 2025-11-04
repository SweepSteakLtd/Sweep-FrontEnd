import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const Header = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 20px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const BalanceCard = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 20px 24px;
  align-items: center;
  gap: 24px;
`;

export const BalanceContainer = styled.View`
  align-items: center;
  gap: 2px;
`;

export const BalanceLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const BalanceAmount = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  width: 100%;
  gap: 12px;
`;

export const ActionButton = styled.TouchableOpacity<{ variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  background-color: ${({ theme, variant }: { theme: Theme; variant: 'primary' | 'secondary' }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.white};
  border-width: ${({ variant }: { variant: 'primary' | 'secondary' }) =>
    variant === 'secondary' ? '1px' : '0px'};
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const ActionButtonText = styled.Text<{ variant: 'primary' | 'secondary' }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme, variant }: { theme: Theme; variant: 'primary' | 'secondary' }) =>
    variant === 'primary' ? theme.colors.white : theme.colors.text.primary};
`;

export const MenuSection = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  margin-top: 12px;
  margin-horizontal: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  overflow: hidden;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 14px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const MenuItemIcon = styled.Text`
  font-size: 20px;
  margin-right: 16px;
  width: 24px;
`;

export const MenuItemText = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const MenuItemArrow = styled.Text`
  font-size: 18px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;
