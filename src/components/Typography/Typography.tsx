import React from 'react';
import { TextProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { StyledText } from './styles';

type TypographyVariant = 'title' | 'heading' | 'subheading' | 'body' | 'caption' | 'label';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | '600';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color,
  children,
  align = 'left',
  weight,
  ...props
}) => {
  const theme = useTheme();
  const defaultColor = color || theme.colors.text.primary;
  return (
    <StyledText variant={variant} color={defaultColor} align={align} weight={weight} {...props}>
      {children}
    </StyledText>
  );
};
