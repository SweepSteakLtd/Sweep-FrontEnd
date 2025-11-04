import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 16 },
})``;

export const Section = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
`;

export const InputRow = styled.View`
  margin-bottom: 20px;
`;

export const LimitLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const RemoveButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-top: 4px;
`;

export const RemoveButtonText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  font-weight: 500;
`;

export const ButtonContainer = styled.View`
  padding: 0 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;
