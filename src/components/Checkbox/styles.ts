import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
`;

interface CheckboxBoxProps {
  checked: boolean;
}

export const CheckboxBox = styled.View<CheckboxBoxProps>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${({ theme, checked }: { theme: Theme; checked: boolean }) =>
    checked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, checked }: { theme: Theme; checked: boolean }) =>
    checked ? theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const LabelContainer = styled.View`
  flex-shrink: 1;
`;
