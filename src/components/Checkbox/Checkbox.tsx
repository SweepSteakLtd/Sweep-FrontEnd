import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';
import { Container, CheckboxBox, LabelContainer } from './styles';

interface CheckboxProps extends TouchableOpacityProps {
  checked: boolean;
  label?: string;
  children?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, label, children, ...props }) => {
  const theme = useTheme();
  return (
    <Container {...props}>
      <CheckboxBox checked={checked} theme={theme}>{checked && <Icon name="✓" size={16} />}</CheckboxBox>
      <LabelContainer>
        {label && (
          <Typography variant="caption" color={theme.colors.white}>
            {label}
          </Typography>
        )}
        {children}
      </LabelContainer>
    </Container>
  );
};
