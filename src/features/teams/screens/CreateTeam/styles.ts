import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  padding-horizontal: 16px;
  padding-top: 16px;
  padding-bottom: 80px;
`;

export const SectionTitle = styled.Text<{ theme: Theme }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
  margin-top: 16px;
`;

export const SelectedCount = styled.Text<{ theme: Theme }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const TeamNameInput = styled.TextInput<{ theme: Theme }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const SelectedPlayersContainer = styled.View<{ theme: Theme }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 12px;
  margin-bottom: 8px;
  height: 130px;
  padding: 12px;
  justify-content: center;
`;

export const SelectedPlayersScroll = styled.ScrollView`
  flex-direction: row;
`;

export const EmptySelectionText = styled.Text<{ theme: Theme }>`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  font-style: italic;
  text-align: center;
`;

export const CurrentGroupTitle = styled.Text<{ theme: Theme }>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

export const SelectionHint = styled.Text<{ theme: Theme }>`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  margin-bottom: 16px;
`;

export const PlayersListContainer = styled.View`
  min-height: 200px;
`;

export const NavigationButtons = styled.View`
  flex-direction: row;
  margin-top: 24px;
  padding-horizontal: 0px;
`;

export const FloatingButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  padding: 16px;
  padding-bottom: 32px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  border-top-width: 1px;
  border-top-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const ViewOnlyBanner = styled.View<{ theme: Theme }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.warning || '#FFA500'}20;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.warning || '#FFA500'};
`;

export const ViewOnlyText = styled.Text<{ theme: Theme }>`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.warning || '#FFA500'};
  text-align: center;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 24px;
`;

export const ErrorIcon = styled.Text`
  font-size: 64px;
  margin-bottom: 24px;
`;

export const ErrorTitle = styled.Text<{ theme: Theme }>`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-bottom: 12px;
  text-align: center;
`;

export const ErrorMessage = styled.Text<{ theme: Theme }>`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: 24px;
`;
