import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { AuthGuard } from '~/components/AuthGuard';
import { BackButton } from '~/components/BackButton/BackButton';
import { FloatingMockButton } from '~/components/FloatingMockButton/FloatingMockButton';
import { CreateAccount } from '~/features/authentication/screens/CreateAccount/CreateAccount';
import { Login } from '~/features/authentication/screens/Login/Login';
import { CreateProfile } from '~/features/create-profile/screens/CreateProfile/CreateProfile';
import { Dashboard } from '~/features/dashboard/screens/Dashboard/Dashboard';
import { CreateGame } from '~/features/games/screens/CreateGame/CreateGame';
import { TermsAndConditions } from '~/features/legal/screens/TermsAndConditions/TermsAndConditions';
import { Landing } from '~/features/onboarding/screens/Landing/Landing';
import { Splash } from '~/features/onboarding/screens/Splash/Splash';
import { Profile } from '~/features/profile/screens/Profile/Profile';
import { Settings } from '~/features/settings/screens/Settings/Settings';
import { TournamentGames } from '~/features/tournaments/screens/TournamentGames/TournamentGames';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <AuthGuard />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={({ navigation }) => ({
          headerShown: false,
          headerBackTitle: ' ',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: (props) => {
            // Only show back button if we can go back
            if (navigation.canGoBack()) {
              return <BackButton tintColor={props.tintColor} />;
            }
            return null;
          },
        })}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="TournamentGames" component={TournamentGames} />
        <Stack.Screen name="CreateGame" component={CreateGame} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
      <FloatingMockButton />
    </NavigationContainer>
  );
};
