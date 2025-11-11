import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  width: 100%;
`;

export const ManualEntryLink = styled.Pressable`
  padding: 8px 0;
`;

export const ManualEntryText = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 500;
`;

export const AddressSuggestionsList = styled.ScrollView`
  max-height: 200px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  border-radius: 8px;
  margin-top: 8px;
`;

export const AddressSuggestion = styled.Pressable`
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const AddressSuggestionText = styled.Text`
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  font-size: 14px;
`;
