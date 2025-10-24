import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: flex-start;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.1);
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
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  background-color: ${({ theme, checked }: { theme: Theme; checked: boolean }) =>
    checked ? theme.colors.white : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const LabelContainer = styled.View`
  flex: 1;
`;
