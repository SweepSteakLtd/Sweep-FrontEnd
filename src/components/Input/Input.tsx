import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '../Typography/Typography';
import { Container, ErrorText, StyledInput } from './styles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  const theme = useTheme();
  return (
    <Container>
      {label && (
        <Typography variant="label" color={theme.colors.white} style={{ marginBottom: 8 }}>
          {label}
        </Typography>
      )}
      <StyledInput theme={theme} placeholderTextColor="rgba(255,255,255,0.5)" {...props} />
      {error && (
        <ErrorText variant="caption" color="#ff6b6b">
          {error}
        </ErrorText>
      )}
    </Container>
  );
};
