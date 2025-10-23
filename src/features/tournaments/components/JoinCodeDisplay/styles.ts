import type { DefaultTheme } from 'styled-components/native';
import styled from 'styled-components/native';
import { Typography } from '~/components/Typography/Typography';

export const Container = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const TitleText = styled(Typography).attrs({
  variant: 'body',
  weight: 'medium',
})`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: 24px;
`;

export const DescriptionText = styled(Typography).attrs({
  variant: 'body',
})`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: 16px;
`;

export const CodeContainer = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.backgroundLight};
  padding: 32px 24px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  width: 100%;
`;

export const CodeText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.primary};
  font-family: 'Poppins-Bold';
  letter-spacing: 4px;
  font-size: 32px;
`;

export const CopyButton = styled.View`
  width: 100%;
  max-width: 300px;
`;
