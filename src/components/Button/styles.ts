import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link';

export const getBackgroundColor = (variant: ButtonVariant, disabled: boolean, theme: Theme) => {
  if (variant === 'link') return 'transparent';
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
      return theme.colors.white;
    default:
      return theme.colors.button.text;
  }
};

export const getBorderColor = (variant: ButtonVariant, theme: Theme) => {
  if (variant === 'link') return 'transparent';
  return variant === 'outline' ? theme.colors.white : 'transparent';
};

interface StyledButtonProps {
  variant: ButtonVariant;
  disabled: boolean;
  fullWidth: boolean;
}

export const StyledButton = styled(TouchableOpacity)<StyledButtonProps>`
  background-color: ${({ theme, variant, disabled }: StyledButtonProps & { theme: Theme }) =>
    getBackgroundColor(variant, disabled, theme)};
  padding: ${({ variant }: StyledButtonProps) => (variant === 'link' ? '8px' : '16px 24px')};
  border-radius: ${({ variant }: StyledButtonProps) => (variant === 'link' ? '0px' : '25px')};
  align-items: center;
  justify-content: center;
  border-width: ${({ variant }: StyledButtonProps) => (variant === 'link' ? '0px' : '2px')};
  border-color: ${({ theme, variant }: StyledButtonProps & { theme: Theme }) =>
    getBorderColor(variant, theme)};
  opacity: ${({ disabled }: StyledButtonProps) => (disabled ? 0.6 : 1)};
  width: ${({ fullWidth }: StyledButtonProps) => (fullWidth ? '100%' : 'auto')};
  flex-direction: row;
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
