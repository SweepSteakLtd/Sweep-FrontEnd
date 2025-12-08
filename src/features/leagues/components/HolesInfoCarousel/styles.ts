import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  margin-top: 8px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  padding: 0 16px;
  margin-bottom: 8px;
`;
