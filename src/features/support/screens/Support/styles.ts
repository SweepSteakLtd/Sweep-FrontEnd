import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const ContentCard = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 20px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const EmailText = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  text-decoration-line: underline;
  font-size: 16px;
`;
