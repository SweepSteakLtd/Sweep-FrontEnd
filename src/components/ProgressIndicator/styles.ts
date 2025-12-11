import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

// Bar variant styles
export const Container = styled.View`
  padding: 20px 0;
  width: 100%;
`;

export const ProgressText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-top: 8px;
  text-align: center;
`;

export const ProgressBar = styled.View`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressFill = styled.View`
  height: 100%;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  border-radius: 4px;
`;

// Dots variant styles
export const DotsContainer = styled.View`
  padding: 12px 4px;
  align-items: center;
`;

export const DotsRowWrapper = styled.View`
  position: relative;
  width: 100%;
`;

export const DotsRowLine = styled.View`
  position: absolute;
  left: 22px;
  right: 22px;
  top: 50%;
  height: 3px;
  margin-top: -1.5px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  border-radius: 2px;
  z-index: 0;
`;

export const DotsRowLineFill = styled(Animated.View)`
  height: 100%;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  border-radius: 2px;
`;

export const DotsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 1;
`;

export const LabelsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 6px;
`;

export const StepDot = styled.View`
  width: 22px;
  height: 22px;
  justify-content: center;
  align-items: center;
`;

export const CheckMark = styled.Text`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

interface StepLabelProps {
  $isActive: boolean;
  $isCompleted: boolean;
}

export const StepLabel = styled.Text<StepLabelProps>`
  font-size: ${({ $isActive }: StepLabelProps) => ($isActive ? '12px' : '10px')};
  font-weight: ${({ $isActive }: StepLabelProps) => ($isActive ? '700' : '500')};
  color: ${({ theme, $isActive, $isCompleted }: { theme: Theme } & StepLabelProps) =>
    $isActive || $isCompleted ? theme.colors.primary : theme.colors.text.tertiary};
  text-align: center;
  width: 22px;
`;
