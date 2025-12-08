import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  border-radius: 12px;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  shadow-color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 2;
`;

export const SkeletonAvatar = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
`;

export const SkeletonText = styled.View`
  flex: 1;
  margin-left: 12px;
`;

interface SkeletonLineProps {
  width: number;
}

export const SkeletonLine = styled.View<SkeletonLineProps>`
  width: ${({ width }: { width: number }) => width}px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
`;

export const SkeletonOdds = styled.View`
  width: 40px;
  height: 20px;
  border-radius: 6px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  margin-right: 8px;
`;
