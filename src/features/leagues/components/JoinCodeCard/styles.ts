import type { DefaultTheme } from 'styled-components/native';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.backgroundLight};
  padding: 16px;
  padding-bottom: 8px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  width: 100%;
  align-items: center;
`;

export const CodeText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.primary};
  font-family: 'Poppins-Bold';
  letter-spacing: 4px;
  font-size: 24px;
  text-align: center;
`;

export const Label = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.tertiary};
  font-size: 12px;
  margin-top: 4px;
  text-align: center;
`;

export const ButtonsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 4px;
`;

export const LinkButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 8px;
`;

export const LinkText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  font-size: 14px;
`;
