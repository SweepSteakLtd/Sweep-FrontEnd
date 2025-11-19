import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  margin-top: 8px;
  margin-bottom: 12px;
  padding: 12px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 8px;
`;

export const StrengthSection = styled.View`
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const StrengthBar = styled.View`
  height: 4px;
  border-radius: 2px;
  transition: width 0.3s ease;
`;

export const StrengthLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
`;

export const RequirementItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const CheckIcon = styled.Text<{ met: boolean }>`
  font-size: 14px;
  margin-right: 8px;
  color: ${({ theme, met }: { theme: Theme; met: boolean }) =>
    met ? theme.colors.success : theme.colors.text.tertiary};
`;

export const RequirementText = styled.Text<{ met: boolean }>`
  font-size: 13px;
  color: ${({ theme, met }: { theme: Theme; met: boolean }) =>
    met ? theme.colors.text.secondary : theme.colors.text.tertiary};
`;

export const StrengthRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BarContainer = styled.View`
  flex: 1;
  margin-right: 12px;
`;

export const BarTrack = styled.View`
  height: 4px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 2px;
  overflow: hidden;
`;
