import styled from 'styled-components/native';
import { Typography } from '../Typography';

export const Container = styled.View`
  margin-bottom: 15px;
`;

export const StyledInput = styled.TextInput<{ theme: any }>`
  background-color: ${(props: { theme: any }) => props.theme.colors.input.background};
  color: ${(props: { theme: any }) => props.theme.colors.white};
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  border-width: 1px;
  border-color: ${(props: { theme: any }) => props.theme.colors.input.border};
`;

export const ErrorText = styled(Typography)`
  margin-top: 4px;
`;
