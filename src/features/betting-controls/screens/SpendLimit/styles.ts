import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 24px;
`;

export const RemainingLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const ProgressContainer = styled.View`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = styled.View<ProgressBarProps>`
  width: ${({ progress }: { progress: number }) => `${progress}%`};
  height: 100%;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

export const RollingLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 24px;
`;

export const RemainingAmount = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 24px;
`;

export const InfoSection = styled.View`
  margin-bottom: 24px;
`;

export const InfoTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

export const InfoText = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;
