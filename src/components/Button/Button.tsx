import React from 'react';
import { ActivityIndicator, TouchableOpacityProps, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ButtonText, getTextColor, StyledButton } from './styles';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'circular';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  title?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  backgroundColor?: string;
  primaryColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant: explicitVariant,
  title,
  icon,
  disabled = false,
  loading = false,
  fullWidth = true,
  backgroundColor,
  primaryColor,
  ...props
}) => {
  const theme = useTheme();

  // Auto-detect circular variant: if only icon is provided and no title
  const isCircular = !title && icon;
  const variant = explicitVariant || (isCircular ? 'circular' : 'primary');

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={getTextColor(variant, theme)} />;
    }

    // If both icon and title are provided, show them together
    if (icon && title) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {icon}
          <ButtonText variant={variant}>{title}</ButtonText>
        </View>
      );
    }

    // If only icon is provided, render it directly
    if (icon) {
      return icon;
    }

    // If only title is provided, wrap it in ButtonText
    if (title) {
      return <ButtonText variant={variant}>{title}</ButtonText>;
    }

    return null;
  };

  return (
    <StyledButton
      variant={variant}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      backgroundColor={backgroundColor}
      primaryColor={primaryColor}
      {...props}
    >
      {renderContent()}
    </StyledButton>
  );
};
