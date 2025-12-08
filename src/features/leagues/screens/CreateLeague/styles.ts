import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
})`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const ButtonContainer = styled.View`
  padding: 0 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;
