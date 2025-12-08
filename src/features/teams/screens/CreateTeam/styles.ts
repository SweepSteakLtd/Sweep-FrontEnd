import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
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

export const SearchInput = styled.TextInput<{ theme: Theme }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  margin-bottom: 8px;
`;

export const EmptyText = styled.Text<{ theme: Theme }>`
  text-align: center;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-top: 40px;
  font-size: 16px;
`;

export const GroupHeader = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 8px;
  padding: 8px 0;
`;

export const GroupHeaderText = styled.Text<{ theme: Theme }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`;

export const GroupHeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GroupSelectedText = styled.Text<{ theme: Theme }>`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  margin-right: 8px;
`;

export const HelpText = styled.Text<{ theme: Theme }>`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  font-style: italic;
  margin-bottom: 8px;
`;

export const SelectedPlayersContainer = styled.View<{ theme: Theme }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 12px;
  margin-bottom: 8px;
  min-height: 64px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

export const EmptySelectionText = styled.Text<{ theme: Theme }>`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  font-style: italic;
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
