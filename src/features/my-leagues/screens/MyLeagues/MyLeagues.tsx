import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { GameCard } from '~/features/tournaments/components/GameCard/GameCard';
import type { RootStackParamList } from '~/navigation/types';
import { useDeleteLeague } from '~/services/apis/League/useDeleteLeague';
import { useGetLeagues } from '~/services/apis/League/useGetLeagues';
import { useGetUser } from '~/services/apis/User/useGetUser';
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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MyLeagues = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const { data: user } = useGetUser();
  const { data: leagues, isLoading } = useGetLeagues(
    user?.id ? { owner_id: user.id } : undefined,
    !!user?.id,
  );
  const deleteLeagueMutation = useDeleteLeague();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Leagues',
    });
  }, [navigation]);

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
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.white }}
        edges={['bottom', 'left', 'right']}
      >
        <MyLeaguesSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.white }}
      edges={['bottom', 'left', 'right']}
    >
      <Container>
        <ScrollContent>
          <Header>
            <BalanceRow>
              <BalanceLabel>Current Balance</BalanceLabel>
            </BalanceRow>
            <BalanceRow style={{ marginTop: 8 }}>
              <BalanceAmount>£{user?.current_balance?.toFixed(2) || '0.00'}</BalanceAmount>
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
              <GameCard
                key={league.id || index}
                game={league}
                index={index}
                onPress={() => {
                  // TODO: Navigate to league details
                  console.log('Navigate to league:', league.id);
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
    </SafeAreaView>
  );
};
