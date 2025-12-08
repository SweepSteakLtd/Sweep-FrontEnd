import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
`;

export const SelectText = styled.Text`
  font-size: 14px;
  margin-bottom: 12px;
  margin-top: 24px;
`;

export const OptionsContainer = styled.View`
  gap: 12px;
`;

interface OptionButtonProps {
  selected: boolean;
}

export const OptionButton = styled.TouchableOpacity<OptionButtonProps>`
  padding: 16px;
  border-radius: 8px;
  border-width: 2px;
  border-color: ${({ theme, selected }: { theme: Theme; selected: boolean }) =>
    selected ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, selected }: { theme: Theme; selected: boolean }) =>
    selected ? `${theme.colors.primary}10` : theme.colors.white};
`;

export const OptionText = styled.Text<OptionButtonProps>`
  font-size: 16px;
  font-weight: ${({ selected }: { selected: boolean }) => (selected ? '600' : '400')};
  color: ${({ theme, selected }: { theme: Theme; selected: boolean }) =>
    selected ? theme.colors.primary : theme.colors.text.primary};
  text-align: center;
`;

export const ButtonContainer = styled.View`
  padding: 0 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const CurrentExclusionBox = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const CurrentExclusionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const CurrentExclusionDate = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;
