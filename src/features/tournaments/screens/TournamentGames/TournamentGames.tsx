import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { AnimatedAmount } from '~/components/AnimatedAmount/AnimatedAmount';
import { TabBar } from '~/components/TabBar/TabBar';
import { Game } from '~/features/tournaments/components/GameCard/GameCard';
import { JoinGameList } from '~/features/tournaments/components/JoinGameList/JoinGameList';
import type { RootStackParamList } from '~/navigation/types';
import { useGetGames } from '~/services/apis/Game/useGetGames';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import {
  Container,
  CreateButton,
  CreateButtonText,
  EmptyState,
  PotInfo,
  PotLabel,
  SegmentedTabWrapper,
} from './styles';

type TournamentGamesRouteProp = RouteProp<RootStackParamList, 'TournamentGames'>;
type TournamentGamesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const TournamentGames = () => {
  const route = useRoute<TournamentGamesRouteProp>();
  const navigation = useNavigation<TournamentGamesNavigationProp>();
  const theme = useTheme();

  const { data: tournaments = [], error: tournamentsError } = useGetTournaments();
  const { data: games = [], isLoading: loading, error: gamesError } = useGetGames();

  // Transform tournaments to tabs format
  const tournamentTabs = tournaments.map((tournament) => ({
    id: tournament.id,
    label: tournament.category,
  }));

  const [activeTournament, setActiveTournament] = useState(route.params?.tournamentId || '');

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'LIVE',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.white,
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 20,
      },
      headerShadowVisible: false,
      headerBackTitle: '',
      headerRight: () => (
        <CreateButton onPress={handleCreateGame}>
          <CreateButtonText>+</CreateButtonText>
        </CreateButton>
      ),
    });
  }, [navigation, theme, activeTournament, tournaments]);

  // Set active tournament from route params or default to first tournament when loaded
  useEffect(() => {
    if (!activeTournament && tournaments.length > 0) {
      setActiveTournament(route.params?.tournamentId || tournaments[0].id);
    }
  }, [tournaments, route.params?.tournamentId, activeTournament]);

  // Filter games by active tournament
  const filteredGames = games.filter((game) => {
    if (activeTournament && game.tournamentId !== activeTournament) return false;
    return true;
  });

  // Calculate total pot from filtered games
  const totalPot = filteredGames.reduce((sum, game) => sum + (game.totalPot || 0), 0);

  const handleGamePress = (game: Game) => {
    // Navigate to game details
    console.log('Game pressed:', game.id);
  };

  const handleCreateGame = () => {
    navigation.navigate('CreateGame', {
      tournamentId: activeTournament || tournaments[0]?.id || '1',
    });
  };

  if (loading) {
    return (
      <Container>
        <EmptyState>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </EmptyState>
      </Container>
    );
  }

  if (tournamentsError || gamesError) {
    return (
      <Container>
        <EmptyState>
          <PotLabel>Failed to load data</PotLabel>
          <PotLabel style={{ fontSize: 14, marginTop: 8 }}>
            {tournamentsError?.message || gamesError?.message || 'Please try again later'}
          </PotLabel>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Level 1: Tournament Tabs - Segmented Style */}
        {tournamentTabs.length > 0 && (
          <SegmentedTabWrapper>
            <TabBar
              tabs={tournamentTabs}
              activeTab={activeTournament}
              onTabPress={setActiveTournament}
              variant="segmented"
            />
          </SegmentedTabWrapper>
        )}

        <PotInfo>
          <PotLabel>
            {activeTournament
              ? `Total Staked in ${tournaments.find((t) => t.id === activeTournament)?.name || 'this tournament'}`
              : 'Total Staked'}
          </PotLabel>
          <AnimatedAmount
            value={totalPot}
            variant="title"
            color={theme.colors.text.secondary}
            align="center"
            weight="bold"
          />
        </PotInfo>
        <JoinGameList games={filteredGames} onGamePress={handleGamePress} />
      </ScrollView>
    </Container>
  );
};
