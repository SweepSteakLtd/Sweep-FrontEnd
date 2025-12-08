import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

interface AvatarContainerProps {
  size: number;
}

export const AvatarContainer = styled.View<AvatarContainerProps>`
  width: ${({ size }: { size: number }) => size}px;
  height: ${({ size }: { size: number }) => size}px;
  border-radius: ${({ size }: { size: number }) => size / 2}px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  overflow: hidden;
`;

export const AvatarImage = styled.Image<AvatarContainerProps>`
  width: ${({ size }: { size: number }) => size}px;
  height: ${({ size }: { size: number }) => size}px;
`;

interface AvatarTextProps {
  size: number;
}

export const AvatarText = styled.Text<AvatarTextProps>`
  font-size: ${({ size }: { size: number }) => Math.floor(size * 0.4)}px;
  font-weight: 700;
  color: #2d5016;
  line-height: ${({ size }: { size: number }) => Math.floor(size * 0.5)}px;
`;
