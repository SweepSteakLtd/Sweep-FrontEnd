import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 20, paddingHorizontal: 16 },
})``;

export const Section = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 0 20px 20px 20px;
  margin-bottom: 12px;
  border-radius: 12px;
`;

export const AvatarSection = styled.View`
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  margin-bottom: 12px;
  border-radius: 12px;
`;

export const AvatarContainer = styled.View`
  position: relative;
  width: 80px;
  height: 80px;
`;

export const EditButton = styled.View`
  position: absolute;
  bottom: -10px;
  right: -10px;
`;

export const SectionTitle = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 20px;
  margin-bottom: 16px;
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
  border-radius: 12px;
  align-items: center;
  margin: 20px 0;
`;

export const DeleteButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;
