import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';
import {
  Container,
  CurrencyPrefix,
  CurrencyWrapper,
  ErrorText,
  EyeIconButton,
  InputWrapper,
  StyledInput,
} from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: 'dark' | 'light' | 'currency';
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

  const labelColor = variant === 'light' ? theme.colors.text.primary : theme.colors.white;
  const hasEyeIcon = secureTextEntry === true;

  const inputContent = (
    <StyledInput
      isFocused={isFocused}
      hasError={!!error}
      hasCurrency={variant === 'currency'}
      hasEyeIcon={hasEyeIcon}
      disabled={props.editable === false}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
      onChangeText={variant === 'currency' ? handleCurrencyChange : onChangeText}
      keyboardType={variant === 'currency' ? 'decimal-pad' : props.keyboardType}
      secureTextEntry={secureTextEntry && !isPasswordVisible}
      {...props}
    />
  );

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
      {variant === 'currency' ? (
        <CurrencyWrapper>
          <CurrencyPrefix
            isFocused={isFocused}
            hasError={!!error}
            disabled={props.editable === false}
          >
            <Typography variant="body" color={theme.colors.text.primary}>
              £
            </Typography>
          </CurrencyPrefix>
          {inputContent}
        </CurrencyWrapper>
      ) : (
        <InputWrapper>
          {inputContent}
          {hasEyeIcon && (
            <EyeIconButton
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              activeOpacity={0.7}
            >
              <Icon name={isPasswordVisible ? '👁️' : '👁️‍🗨️'} size={20} />
            </EyeIconButton>
          )}
        </InputWrapper>
      )}
      {error && (
        <ErrorText variant="caption" color={theme.colors.error}>
          {error}
        </ErrorText>
      )}
    </Container>
  );
};
