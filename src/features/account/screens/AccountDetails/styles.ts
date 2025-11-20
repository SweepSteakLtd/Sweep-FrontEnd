import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const ScrollContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 20, paddingBottom: 20, paddingHorizontal: 0 },
})`
  flex: 1;
`;

export const Section = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 0 20px 20px 20px;
  margin-bottom: 12px;
  margin-horizontal: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const AvatarSection = styled.View`
  align-items: center;
  padding: 20px;
  margin-bottom: 12px;
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

export const ButtonContainer = styled.View`
  padding: 0 16px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;
