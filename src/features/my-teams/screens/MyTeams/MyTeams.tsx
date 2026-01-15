import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, FlatList, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackParamList } from '~/navigation/types';
import type { Team } from '~/services/apis/Team/types';
import { useGetTeams } from '~/services/apis/Team/useGetTeams';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { formatCurrency } from '~/utils/currency';
import { TeamCard } from '../../components/TeamCard';
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
  SectionTitle,
  StatCircle,
  StatItem,
  StatLabel,
  StatsRow,
  StatValue,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MyTeams = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { data: user, refetch: refetchUser } = useGetUser();
  const { data: teams, isLoading, refetch: refetchTeams } = useGetTeams();
  const { data: tournaments, refetch: refetchTournaments } = useGetTournaments();
  const [refreshing, setRefreshing] = useState(false);

  // Handle Android hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const handleTeamPress = useCallback(
    (team: Team) => {
      if (!team.team?.id || !team.league?.id) return;

      const playerIds = team.players?.map((p: { id?: string }) => p.id).filter(Boolean) as string[];

      // Find tournament to get start time
      const tournamentId = team.league?.tournament_id;
      const tournament = tournaments?.find((t) => t.id === tournamentId);

      navigation.navigate('Tournament', {
        tournamentId: tournamentId || '',
        screen: 'Team',
        params: {
          leagueId: team.league.id,
          teamId: team.team.id,
          teamName: team.team.name || '',
          playerIds,
          tournamentStartTime: tournament?.starts_at,
        },
      });
    },
    [navigation, tournaments],
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchUser(), refetchTeams(), refetchTournaments()]);
    setRefreshing(false);
  };

  const teamsCount = teams?.length || 0;
  const leaguesCount = new Set(teams?.map((t) => t.league?.id).filter(Boolean)).size;

  const renderTeamCard = useCallback(
    ({ item }: { item: Team }) => <TeamCard team={item} onPress={() => handleTeamPress(item)} />,
    [handleTeamPress],
  );

  const keyExtractor = useCallback(
    (item: Team, index: number) => item.team?.id || `team-${index}`,
    [],
  );

  const ListHeader = (
    <>
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
    </>
  );

  const ListEmpty = (
    <EmptyState>
      <EmptyStateIcon>🏌️</EmptyStateIcon>
      <EmptyStateTitle>No Teams Yet</EmptyStateTitle>
      <EmptyStateText>
        You haven't created any teams yet.{'\n'}Join a league to get started!
      </EmptyStateText>
    </EmptyState>
  );

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
        <FlatList
          data={teams}
          renderItem={renderTeamCard}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={ListEmpty}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        />
      </Container>
    </ScreenWrapper>
  );
};
