import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const WebViewContainer = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const LoadingText = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-top: 16px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const ErrorIcon = styled.Text`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const ErrorTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
  text-align: center;
`;

export const ErrorMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: 20px;
  margin-bottom: 24px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  width: 100%;
  max-width: 300px;
`;
