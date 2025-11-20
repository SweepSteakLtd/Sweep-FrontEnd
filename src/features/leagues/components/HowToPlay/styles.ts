import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const Header = styled.View<{ theme: Theme }>`
  margin-bottom: 20px;
  padding-horizontal: 20px;
`;

export const SectionsContainer = styled.View<{ theme: Theme }>`
  gap: 16px;
  padding-horizontal: 20px;
`;
