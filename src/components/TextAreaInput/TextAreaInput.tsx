import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '../Typography/Typography';
import { CharacterCount, Container, ErrorText, StyledTextArea } from './styles';

interface TextAreaInputProps extends Omit<TextInputProps, 'multiline'> {
  label?: string;
  error?: string;
  variant?: 'dark' | 'light';
  maxLength?: number;
  showCharacterCount?: boolean;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  error,
  variant = 'dark',
  maxLength = 500,
  showCharacterCount = true,
  onFocus,
  onBlur,
  value = '',
  onChangeText,
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

  const characterCount = value.length;
  const remainingCharacters = maxLength - characterCount;

  const labelColor = variant === 'light' ? theme.colors.text.primary : theme.colors.white;

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
      <StyledTextArea
        isFocused={isFocused}
        hasError={!!error}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChangeText={onChangeText}
        multiline
        maxLength={maxLength}
        textAlignVertical="top"
        {...props}
      />
      {showCharacterCount && (
        <CharacterCount isNearLimit={remainingCharacters < 50}>
          <Typography
            variant="caption"
            color={remainingCharacters < 50 ? theme.colors.error : theme.colors.text.secondary}
          >
            {remainingCharacters} characters remaining
          </Typography>
        </CharacterCount>
      )}
      {error && (
        <ErrorText variant="caption" color={theme.colors.error}>
          {error}
        </ErrorText>
      )}
    </Container>
  );
};
