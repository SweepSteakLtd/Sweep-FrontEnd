import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

interface TabProps {
  active: boolean;
  isLast: boolean;
  theme: Theme;
}

interface TabTextProps {
  active: boolean;
  theme: Theme;
}

export const Container = styled.View<{ theme: Theme }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  padding: 4px;
  border-radius: 12px;
  align-self: stretch;
  max-height: 48px;
`;

export const Tab = styled.TouchableOpacity<TabProps>`
  padding: 10px 16px;
  margin-right: ${({ isLast }: TabProps) => (isLast ? '0px' : '4px')};
  border-radius: 8px;
  background-color: ${({ active, theme }: TabProps) =>
    active ? theme.colors.primary : 'transparent'};
  border-width: 0px;
  border-color: transparent;
  min-width: auto;
  align-items: center;
  justify-content: center;
  ${({ active }: TabProps) =>
    active &&
    `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.15;
    shadow-radius: 3px;
    elevation: 3;
  `}
`;

export const TabText = styled.Text<TabTextProps>`
  font-size: 14px;
  font-weight: ${({ active }: TabTextProps) => (active ? '700' : '400')};
  color: ${({ active, theme }: TabTextProps) =>
    active ? theme.colors.white : theme.colors.text.primary};
  letter-spacing: 0.3px;
`;
