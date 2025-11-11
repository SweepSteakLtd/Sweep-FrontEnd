import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  width: 100%;
  margin-bottom: 15px;
`;

export const ErrorText = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  font-size: 12px;
  margin-top: 4px;
`;
