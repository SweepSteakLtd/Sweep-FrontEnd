import type { DefaultTheme } from 'styled-components/native';
import styled from 'styled-components/native';
import { Typography } from '~/components/Typography/Typography';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const Title = styled(Typography)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.primary};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`;

export const ResultContainer = styled.View`
  margin-top: 24px;
  padding: 16px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.backgroundLight};
  border-radius: 12px;
`;

export const ResultTitle = styled(Typography)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.primary};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const ResultText = styled(Typography)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin-bottom: 4px;
`;

export const PreviewImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-top: 12px;
`;
