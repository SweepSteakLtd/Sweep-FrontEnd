import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';
import { hexWithOpacity } from '~/utils/color';

interface HeaderSectionProps {
  backgroundColor?: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const HeaderSection = styled.View<HeaderSectionProps>`
  background-color: ${({ backgroundColor }: HeaderSectionProps) =>
    backgroundColor ? hexWithOpacity(backgroundColor, 0.2) : 'transparent'};
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 32,
  },
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
})`
  flex: 1;
`;

export const ButtonsContainer = styled.View`
  padding: 0 16px;
  gap: 12px;
`;
