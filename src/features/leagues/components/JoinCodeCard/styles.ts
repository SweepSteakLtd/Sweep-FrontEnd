import type { DefaultTheme } from 'styled-components/native';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.backgroundLight};
  padding: 12px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  width: 100%;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.secondary};
  font-size: 10px;
  font-weight: 500;
  margin-bottom: 2px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CodeContainer = styled.TouchableOpacity`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  padding: 8px 16px;
  border-radius: 8px;
  align-items: center;
  width: 100%;
`;

export const CodeText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.primary};
  font-family: 'Poppins-Bold';
  letter-spacing: 4px;
  font-size: 24px;
  text-align: center;
`;

export const HintText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.tertiary};
  font-size: 10px;
  margin-top: 4px;
`;

export const Label = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.tertiary};
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`;

export const ShareButton = styled.TouchableOpacity`
  align-items: center;
  padding: 8px;
  margin-top: 8px;
`;

export const ShareButtonText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  font-size: 14px;
`;

export const ShareHintText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.tertiary};
  font-size: 10px;
  margin-top: 2px;
`;
