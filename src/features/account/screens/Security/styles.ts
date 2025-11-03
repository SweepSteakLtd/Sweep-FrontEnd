import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 20 },
})``;

export const Section = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 20px;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 20px;
`;

export const InputRow = styled.View`
  margin-bottom: 16px;
`;

export const UpdateButton = styled.TouchableOpacity`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-top: 8px;
`;

export const UpdateButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;
