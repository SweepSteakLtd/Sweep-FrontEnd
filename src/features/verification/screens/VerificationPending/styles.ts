import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  flex: 1;
  background-color: ${(props: { theme: Theme }) => props.theme.colors.white};
`;

export const ButtonGroup = styled.View<{ theme: Theme }>`
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding: 24px;
`;
