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

export const AvatarSection = styled.View`
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  margin-bottom: 12px;
`;

export const ChangePhotoButton = styled.TouchableOpacity`
  margin-top: 12px;
`;

export const ChangePhotoText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  text-decoration: underline;
`;

export const SectionTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 12px;
`;

export const InputRow = styled.View`
  margin-bottom: 12px;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

export const ToggleLabel = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const DeleteButton = styled.TouchableOpacity`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.error};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin: 20px;
`;

export const DeleteButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;
