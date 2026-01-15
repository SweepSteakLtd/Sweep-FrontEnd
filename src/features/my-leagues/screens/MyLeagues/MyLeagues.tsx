import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { BackHandler, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { LeagueCard } from '~/features/tournaments/components/LeagueCard/LeagueCard';
import type { RootStackParamList } from '~/navigation/types';
import { useDeleteLeague } from '~/services/apis/League/useDeleteLeague';
import { useGetLeagues } from '~/services/apis/League/useGetLeagues';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { formatCurrency } from '~/utils/currency';
import { MyLeaguesSkeleton } from './MyLeaguesSkeleton';
import {
  BalanceAmount,
  BalanceLabel,
  BalanceRow,
  Container,
  EmptyState,
  EmptyStateText,
  Header,
  ScrollContent,
  SectionTitle,
  StatCircle,
  StatItem,
  StatLabel,
  StatsRow,
  StatValue,
} from './styles';

type MyLeaguesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MyLeagues = () => {
  const theme = useTheme();
  const navigation = useNavigation<MyLeaguesNavigationProp>();
  const { data: user, refetch: refetchUser } = useGetUser();
  const {
    data: leagues,
    isLoading,
    refetch: refetchLeagues,
  } = useGetLeagues(user?.id ? { owner_id: user.id } : undefined, !!user?.id);
  const deleteLeagueMutation = useDeleteLeague();
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

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchUser(), refetchLeagues()]);
    setRefreshing(false);
  };

  // Calculate stats
  const leaguesCreatedCount = leagues?.length || 0;

  const handleLeagueDelete = async (leagueId: string) => {
    try {
      await deleteLeagueMutation.mutateAsync(leagueId);
    } catch (error) {
      console.error('Failed to delete league:', error);
    }
  };

  if (isLoading) {
    return (
      <ScreenWrapper title="My Leagues">
        <MyLeaguesSkeleton />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title="My Leagues">
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
            <BalanceRow>
              <BalanceLabel>Current Balance</BalanceLabel>
            </BalanceRow>
            <BalanceRow style={{ marginTop: 8 }}>
              <BalanceAmount>{formatCurrency(user?.current_balance)}</BalanceAmount>
            </BalanceRow>

            <StatsRow>
              <StatItem>
                <StatCircle>
                  <StatValue>{leaguesCreatedCount}</StatValue>
                </StatCircle>
                <StatLabel>Leagues Made</StatLabel>
              </StatItem>
            </StatsRow>
          </Header>

          <SectionTitle>Leagues</SectionTitle>

          {leagues && leagues.length > 0 ? (
            leagues.map((league, index) => (
              <LeagueCard
                key={league.id || index}
                league={league}
                index={index}
                onPress={() => {
                  if (league.id) {
                    navigation.navigate('Tournament', {
                      tournamentId: league.tournament_id || '',
                      screen: 'LeagueHome',
                      params: { leagueId: league.id },
                    });
                  }
                }}
                onDelete={handleLeagueDelete}
              />
            ))
          ) : (
            <EmptyState>
              <EmptyStateText>
                You haven't joined any leagues yet.{'\n'}Browse tournaments to find leagues to join!
              </EmptyStateText>
            </EmptyState>
          )}
        </ScrollContent>
      </Container>
    </ScreenWrapper>
  );
};
