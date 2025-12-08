import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';
import { Container, ErrorText, EyeIconButton, InputWrapper, Prefix, StyledInput } from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: 'dark' | 'light' | 'currency' | 'phone';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = 'dark',
  onFocus,
  onBlur,
  value,
  onChangeText,
  secureTextEntry,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleCurrencyChange = (text: string) => {
    // Only allow numbers and one decimal point with max 2 decimal places
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(text) || text === '') {
      onChangeText?.(text);
    }
  };

  const hasEyeIcon = secureTextEntry === true;

  return (
    <Container>
      {label && (
        <Typography
          variant="label"
          color={theme.colors.text.tertiary}
          style={{ marginBottom: 6, fontSize: 14, fontWeight: '500' }}
        >
          {label}
        </Typography>
      )}
      <InputWrapper isFocused={isFocused} hasError={!!error} disabled={props.editable === false}>
        {(variant === 'currency' || variant === 'phone') && (
          <Prefix>
            <Typography variant="body" color={theme.colors.text.primary}>
              {variant === 'phone' ? '+44' : '£'}
            </Typography>
          </Prefix>
        )}
        <StyledInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={variant === 'currency' ? handleCurrencyChange : onChangeText}
          keyboardType={variant === 'currency' ? 'decimal-pad' : props.keyboardType}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        {hasEyeIcon && (
          <EyeIconButton
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            <Icon name={isPasswordVisible ? '👁️' : '👁️‍🗨️'} size={20} />
          </EyeIconButton>
        )}
      </InputWrapper>
      {error && (
        <ErrorText variant="caption" color={theme.colors.error}>
          {error}
        </ErrorText>
      )}
    </Container>
  );
};
