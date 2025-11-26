import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { useGetTeams } from '~/services/apis/Team/useGetTeams';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { formatCurrency } from '~/utils/currency';
import { MyTeamsSkeleton } from './MyTeamsSkeleton';
import {
  BalanceAmount,
  BalanceLabel,
  BalanceRow,
  Container,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  EmptyStateTitle,
  Header,
  LeagueName,
  PlayerChip,
  PlayerName,
  PlayersContainer,
  PlayersRow,
  PositionBadge,
  PositionText,
  ScrollContent,
  SectionTitle,
  StatCircle,
  StatItem,
  StatLabel,
  StatsRow,
  StatValue,
  TeamCard,
  TeamCardHeader,
  TeamHeader,
  TeamName,
} from './styles';

export const MyTeams = () => {
  const theme = useTheme();
  const { data: user, refetch: refetchUser } = useGetUser();
  const { data: teams, isLoading, refetch: refetchTeams } = useGetTeams();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchUser(), refetchTeams()]);
    setRefreshing(false);
  };

  // Calculate stats
  const teamsCount = teams?.length || 0;
  const leaguesCount = new Set(teams?.map((t) => t.league?.id).filter(Boolean)).size;

  if (isLoading) {
    return (
      <ScreenWrapper title="My Teams">
        <MyTeamsSkeleton />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title="My Teams">
      <Container>
        <ScrollContent
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        >
          <Header>
            <BalanceLabel>Current Balance</BalanceLabel>
            <BalanceRow style={{ marginTop: 4 }}>
              <BalanceAmount>{formatCurrency(user?.current_balance)}</BalanceAmount>
            </BalanceRow>

            <StatsRow>
              <StatItem>
                <StatCircle>
                  <StatValue>{teamsCount}</StatValue>
                </StatCircle>
                <StatLabel>Teams</StatLabel>
              </StatItem>
              <StatItem>
                <StatCircle>
                  <StatValue>{leaguesCount}</StatValue>
                </StatCircle>
                <StatLabel>Leagues</StatLabel>
              </StatItem>
            </StatsRow>
          </Header>

          <SectionTitle>My Teams</SectionTitle>

          {teams && teams.length > 0 ? (
            teams.map((team, index) => {
              const position = undefined; // TODO: Get from API when available
              const isTop3 = position !== undefined && position <= 3;
              const playersCount = team.players?.length || 0;

              return (
                <TeamCard
                  key={`${team.team?.id || index}`}
                  activeOpacity={0.7}
                  onPress={() => {
                    // TODO: Navigate to team details
                    console.log('Navigate to team:', team.team?.id);
                  }}
                >
                  <TeamCardHeader>
                    <TeamHeader>
                      <TeamName>{team.team?.name || 'Unnamed Team'}</TeamName>
                      <LeagueName>{team.league?.name || 'Unknown League'}</LeagueName>
                    </TeamHeader>
                    <PositionBadge isTop3={isTop3}>
                      <PositionText isTop3={isTop3}>
                        {position !== undefined ? `#${position}` : '-'}
                      </PositionText>
                    </PositionBadge>
                  </TeamCardHeader>

                  {playersCount > 0 && (
                    <PlayersContainer>
                      <PlayersRow>
                        <PlayerChip>
                          <PlayerName>
                            {playersCount} {playersCount === 1 ? 'player' : 'players'} selected
                          </PlayerName>
                        </PlayerChip>
                      </PlayersRow>
                    </PlayersContainer>
                  )}
                </TeamCard>
              );
            })
          ) : (
            <EmptyState>
              <EmptyStateIcon>🏌️</EmptyStateIcon>
              <EmptyStateTitle>No Teams Yet</EmptyStateTitle>
              <EmptyStateText>
                You haven't created any teams yet.{'\n'}Join a league to get started!
              </EmptyStateText>
            </EmptyState>
          )}
        </ScrollContent>
      </Container>
    </ScreenWrapper>
  );
};
