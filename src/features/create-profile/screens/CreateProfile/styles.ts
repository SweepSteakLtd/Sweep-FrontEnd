import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  flex: 1;
  background-color: ${(props: { theme: Theme }) => props.theme.colors.white};
  padding: 60px 30px 30px 30px;
`;

export const StepsContainer = styled.View<{ theme: Theme }>`
  width: 100%;
  flex: 1;
`;

export const ButtonGroup = styled.View<{ theme: Theme }>`
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;
