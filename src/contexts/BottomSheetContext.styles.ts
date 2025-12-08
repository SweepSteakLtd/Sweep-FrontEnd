import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const SheetContainer = styled.View`
  flex: 1;
  padding-horizontal: 16px;
`;

export const SheetHeader = styled.View`
  padding: 16px 0;
  margin-bottom: 8px;
`;

export const OptionItem = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 4px;
`;

export const CheckIcon = styled.Text`
  font-size: 20px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;
