import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';
import type { TabBarVariant } from './TabBar';

interface ContainerProps {
  variant: TabBarVariant;
  theme: Theme;
}

interface TabProps {
  active: boolean;
  variant: TabBarVariant;
  isLast: boolean;
  theme: Theme;
}

interface TabTextProps {
  active: boolean;
  variant: TabBarVariant;
  theme: Theme;
}

export const Container = styled.View<ContainerProps>`
  background-color: ${({ variant, theme }: ContainerProps) =>
    variant === 'segmented' ? theme.colors.backgroundLight : 'transparent'};
  padding: ${({ variant }: ContainerProps) => (variant === 'segmented' ? '4px' : '4px 0')};
  border-radius: ${({ variant }: ContainerProps) => (variant === 'segmented' ? '12px' : '0px')};
  align-self: stretch;
  max-height: ${({ variant }: ContainerProps) => (variant === 'segmented' ? '48px' : 'auto')};
`;

export const Tab = styled.TouchableOpacity<TabProps>`
  padding: ${({ variant }: TabProps) => (variant === 'segmented' ? '10px 16px' : '14px 24px')};
  margin-right: ${({ variant, isLast }: TabProps) => {
    if (variant === 'segmented' && isLast) return '0px';
    return variant === 'segmented' ? '4px' : '0px';
  }};
  border-radius: ${({ variant }: TabProps) => (variant === 'segmented' ? '8px' : '12px')};
  background-color: ${({ active, theme, variant }: TabProps) => {
    if (variant === 'segmented') {
      return active ? theme.colors.primary : 'transparent';
    }
    return active ? theme.colors.white : 'transparent';
  }};
  border-width: 0px;
  border-color: transparent;
  min-width: ${({ variant }: TabProps) => (variant === 'segmented' ? 'auto' : '90px')};
  align-items: center;
  justify-content: center;
  ${({ active, variant }: TabProps) =>
    active &&
    variant === 'segmented' &&
    `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.15;
    shadow-radius: 3px;
    elevation: 3;
  `}
  ${({ active, variant }: TabProps) =>
    active &&
    variant === 'default' &&
    `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.15;
    shadow-radius: 4px;
    elevation: 3;
  `}
`;

export const TabText = styled.Text<TabTextProps>`
  font-size: ${({ variant }: TabTextProps) => (variant === 'segmented' ? '14px' : '16px')};
  font-weight: ${({ active, variant }: TabTextProps) => {
    if (variant === 'segmented') {
      return active ? '700' : '400';
    }
    return active ? '700' : '600';
  }};
  color: ${({ active, theme, variant }: TabTextProps) => {
    if (variant === 'segmented') {
      return active ? theme.colors.white : theme.colors.text.primary;
    }
    return active ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.75)';
  }};
  letter-spacing: 0.3px;
`;
