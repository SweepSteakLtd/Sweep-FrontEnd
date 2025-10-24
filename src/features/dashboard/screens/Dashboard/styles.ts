import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const ProfileButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 12px;
  gap: 8px;
`;

export const ProfileBalance = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const TournamentGrid = styled.View`
  flex: 1;
`;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 40px;
`;

export const AmountContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

export const UserName = styled.Text`
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
`;
