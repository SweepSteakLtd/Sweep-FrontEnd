import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 12px;
  margin-bottom: 8px;
  min-height: 64px;
  padding: 12px 0;
  padding-left: 16px;
`;

export const ScrollContainer = styled.ScrollView`
  flex-direction: row;
`;

export const AvatarWrapper = styled.View`
  margin-left: -8px;
`;

export const EmptyText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  font-style: italic;
  padding: 0 16px;
`;
