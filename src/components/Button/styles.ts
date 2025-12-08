import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'circular';

export const getBackgroundColor = (variant: ButtonVariant, disabled: boolean, theme: Theme) => {
  if (variant === 'link') return 'transparent';
  if (variant === 'circular') return theme.colors.white;
  if (disabled) return '#8b8b8b';

  switch (variant) {
    case 'primary':
      return theme.colors.button.primary;
    case 'secondary':
      return theme.colors.primary;
    case 'outline':
      return 'transparent';
    default:
      return theme.colors.button.primary;
  }
};

export const getTextColor = (variant: ButtonVariant, theme: Theme) => {
  switch (variant) {
    case 'primary':
      return theme.colors.button.text;
    case 'secondary':
      return theme.colors.white;
    case 'outline':
      return theme.colors.white;
    case 'link':
      return theme.colors.primary;
    default:
      return theme.colors.button.text;
  }
};

export const getBorderColor = (variant: ButtonVariant, theme: Theme) => {
  if (variant === 'link') return 'transparent';
  if (variant === 'circular') return '#d1d1d1';
  return variant === 'outline' ? theme.colors.white : 'transparent';
};

interface StyledButtonProps {
  variant: ButtonVariant;
  disabled: boolean;
  fullWidth: boolean;
  backgroundColor?: string;
}

export const StyledButton = styled(TouchableOpacity)<StyledButtonProps>`
  background-color: ${({
    theme,
    variant,
    disabled,
    backgroundColor,
  }: StyledButtonProps & { theme: Theme }) =>
    backgroundColor || getBackgroundColor(variant, disabled, theme)};
  padding: ${({ variant }: StyledButtonProps) => {
    if (variant === 'link') return '8px';
    if (variant === 'circular') return '8px';
    return '16px 24px';
  }};
  border-radius: ${({ variant }: StyledButtonProps) => {
    if (variant === 'link') return '0px';
    if (variant === 'circular') return '100px';
    return '25px';
  }};
  align-items: center;
  justify-content: center;
  border-width: ${({ variant }: StyledButtonProps) => {
    if (variant === 'link') return '0px';
    if (variant === 'circular') return '1px';
    return '2px';
  }};
  border-color: ${({ theme, variant }: StyledButtonProps & { theme: Theme }) =>
    getBorderColor(variant, theme)};
  opacity: ${({ disabled }: StyledButtonProps) => (disabled ? 0.6 : 1)};
  width: ${({ fullWidth, variant }: StyledButtonProps) => {
    if (variant === 'circular') return 'auto';
    return fullWidth ? '100%' : 'auto';
  }};
  ${({ variant }: StyledButtonProps) => variant === 'circular' && 'aspect-ratio: 1;'}
`;

interface ButtonTextProps {
  variant: ButtonVariant;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({ theme, variant }: ButtonTextProps & { theme: Theme }) =>
    getTextColor(variant, theme)};
  font-size: ${({ variant }: ButtonTextProps) => (variant === 'link' ? '14px' : '16px')};
  font-weight: ${({ variant }: ButtonTextProps) => (variant === 'link' ? 'normal' : '600')};
`;
