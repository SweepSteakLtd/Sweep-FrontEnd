import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const SheetContainer = styled.View`
  flex: 1;
`;

export const SheetHeader = styled.View`
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const OptionItem = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  background-color: ${({ theme, isSelected }: { theme: Theme; isSelected: boolean }) =>
    isSelected ? theme.colors.backgroundLight : 'transparent'};
`;
