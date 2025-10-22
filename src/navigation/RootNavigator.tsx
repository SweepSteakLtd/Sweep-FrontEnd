import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthGuard } from '~/components/AuthGuard';
import { FloatingMockButton } from '~/components/FloatingMockButton/FloatingMockButton';
import { CreateAccount } from '~/features/auth/screens/CreateAccount/CreateAccount';
import { Landing } from '~/features/auth/screens/Landing/Landing';
import { Login } from '~/features/auth/screens/Login/Login';
import { ProfileSetup } from '~/features/auth/screens/ProfileSetup/ProfileSetup';
import { Splash } from '~/features/auth/screens/Splash/Splash';
import { TermsAndConditions } from '~/features/auth/screens/TermsAndConditions/TermsAndConditions';
import { Dashboard } from '~/features/dashboard/screens/Dashboard/Dashboard';
import { CreateGame } from '~/features/games/screens/CreateGame/CreateGame';
import { Settings } from '~/features/settings/screens/Settings/Settings';
import { TournamentGames } from '~/features/tournaments/screens/TournamentGames/TournamentGames';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <AuthGuard />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="TournamentGames" component={TournamentGames} />
        <Stack.Screen name="CreateGame" component={CreateGame} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
      <FloatingMockButton />
    </NavigationContainer>
  );
};
