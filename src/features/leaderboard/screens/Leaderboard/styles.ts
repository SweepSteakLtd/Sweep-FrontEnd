import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
`;

export const SearchContainer = styled.View`
  padding-horizontal: 16px;
  margin-bottom: 12px;
`;

export const LeaderboardWrapperOpen = styled.View`
  margin-top: 12px;
  background-color: #FFB200;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-top-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  min-height: 0px;
`;

export const LeaderboardWrapperClose = styled.View`
  margin-bottom: 20px;
  background-color: #FFB200;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  min-height: 0px;
`;

export const CardWrapper = styled.View<{ isOpenTournament?: boolean; isPGATournament?: boolean }>`
  padding-horizontal: 0px;
  padding-vertical: 0px;
  background-color: ${({ isOpenTournament, isPGATournament }: { isOpenTournament?: boolean; isPGATournament?: boolean }) =>
    isOpenTournament ? '#FFB200' : isPGATournament ? '#0D2363' : '#1e40af'};
  border-left-width: ${({ isOpenTournament }: { isOpenTournament?: boolean }) =>
    isOpenTournament ? '2px' : '0px'};
  border-right-width: ${({ isOpenTournament }: { isOpenTournament?: boolean }) =>
    isOpenTournament ? '2px' : '0px'};
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const SearchInput = styled.TextInput`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
`;
