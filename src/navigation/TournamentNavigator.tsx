import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TournamentThemeProvider } from '~/context/TournamentThemeContext';
import { Leaderboard } from '~/features/leaderboard/screens/Leaderboard/Leaderboard';
import { CreateLeague } from '~/features/leagues/screens/CreateLeague/CreateLeague';
import { LeagueHome } from '~/features/leagues/screens/LeagueHome/LeagueHome';
import { TeamScreen } from '~/features/teams/screens/CreateTeam/CreateTeam';
import { TournamentLeagues } from '~/features/tournaments/screens/TournamentLeagues/TournamentLeagues';
import type { RootStackParamList, TournamentStackParamList } from './types';

const Stack = createNativeStackNavigator<TournamentStackParamList>();

type TournamentNavigatorRouteProp = RouteProp<RootStackParamList, 'Tournament'>;

export const TournamentNavigator = () => {
  const route = useRoute<TournamentNavigatorRouteProp>();
  const initialColors = route.params?.tournamentColors;

  return (
    <TournamentThemeProvider initialColors={initialColors}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName="TournamentLeagues"
      >
        <Stack.Screen
          name="TournamentLeagues"
          component={TournamentLeagues}
          initialParams={{ tournamentId: route.params?.tournamentId }}
        />
        <Stack.Screen name="LeagueHome" component={LeagueHome} />
        <Stack.Screen name="CreateLeague" component={CreateLeague} />
        <Stack.Screen name="Team" component={TeamScreen} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
      </Stack.Navigator>
    </TournamentThemeProvider>
  );
};
