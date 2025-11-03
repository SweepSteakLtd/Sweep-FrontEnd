import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ButtonText, getTextColor, StyledButton } from './styles';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'circular';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  disabled = false,
  loading = false,
  fullWidth = true,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledButton variant={variant} disabled={disabled || loading} fullWidth={fullWidth} {...props}>
      {loading ? (
        <ActivityIndicator color={getTextColor(variant, theme)} />
      ) : variant === 'circular' ? (
        children
      ) : (
        <ButtonText variant={variant}>{children}</ButtonText>
      )}
    </StyledButton>
  );
};
