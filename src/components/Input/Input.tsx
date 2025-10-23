import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '../Typography/Typography';
import { Container, ErrorText, StyledInput } from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: 'dark' | 'light';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = 'dark',
  onFocus,
  onBlur,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const labelColor = variant === 'light' ? theme.colors.white : theme.colors.text.primary;

  return (
    <Container>
      {label && (
        <Typography
          variant="label"
          color={labelColor}
          style={{ marginBottom: 4, fontSize: 13, fontWeight: '400' }}
        >
          {label}
        </Typography>
      )}
      <StyledInput
        theme={theme}
        isFocused={isFocused}
        hasError={!!error}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && (
        <ErrorText variant="caption" color={theme.colors.error}>
          {error}
        </ErrorText>
      )}
    </Container>
  );
};
