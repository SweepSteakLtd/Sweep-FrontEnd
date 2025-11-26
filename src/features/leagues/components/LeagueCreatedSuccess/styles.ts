import type { DefaultTheme } from 'styled-components/native';
import styled from 'styled-components/native';
import { Typography } from '~/components/Typography/Typography';

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  align-items: center;
  justify-content: center;
`;

export const SuccessIcon = styled.Text`
  font-size: 64px;
  margin-bottom: 20px;
`;

export const TitleText = styled(Typography).attrs({
  variant: 'heading',
  weight: 'bold',
})`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: 12px;
  font-size: 24px;
`;

export const DescriptionText = styled(Typography).attrs({
  variant: 'body',
})`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: 32px;
  font-size: 16px;
`;

export const CodeCardWrapper = styled.View`
  width: 100%;
  margin-bottom: 24px;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  gap: 12px;
  margin-top: 8px;
`;
