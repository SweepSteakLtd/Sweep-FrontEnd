import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link';

export const getBackgroundColor = (variant: ButtonVariant, disabled: boolean, theme: any) => {
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

export const getTextColor = (variant: ButtonVariant, theme: any) => {
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

export const getBorderColor = (variant: ButtonVariant, theme: any) => {
  if (variant === 'link') return 'transparent';
  return variant === 'outline' ? theme.colors.white : 'transparent';
};

interface StyledButtonProps {
  variant: ButtonVariant;
  disabled: boolean;
  fullWidth: boolean;
  theme: any;
}

export const StyledButton = styled(TouchableOpacity)<StyledButtonProps>`
  background-color: ${(props: StyledButtonProps) =>
    getBackgroundColor(props.variant, props.disabled, props.theme)};
  padding: ${(props: StyledButtonProps) => (props.variant === 'link' ? '8px' : '16px 24px')};
  border-radius: ${(props: StyledButtonProps) => (props.variant === 'link' ? '0px' : '25px')};
  align-items: center;
  justify-content: center;
  border-width: ${(props: StyledButtonProps) => (props.variant === 'link' ? '0px' : '2px')};
  border-color: ${(props: StyledButtonProps) => getBorderColor(props.variant, props.theme)};
  opacity: ${(props: StyledButtonProps) => (props.disabled ? 0.6 : 1)};
  width: ${(props: StyledButtonProps) => (props.fullWidth ? '100%' : 'auto')};
  flex-direction: row;
`;

interface ButtonTextProps {
  variant: ButtonVariant;
  theme: any;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${(props: ButtonTextProps) => getTextColor(props.variant, props.theme)};
  font-size: ${(props: ButtonTextProps) => (props.variant === 'link' ? '14px' : '16px')};
  font-weight: ${(props: ButtonTextProps) => (props.variant === 'link' ? 'normal' : '600')};
`;
