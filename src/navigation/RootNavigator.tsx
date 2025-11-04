import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { AuthGuard } from '~/components/AuthGuard';
import { BackButton } from '~/components/BackButton/BackButton';
import { AccountDetails } from '~/features/account/screens/AccountDetails/AccountDetails';
import { Security } from '~/features/account/screens/Security/Security';
import { CreateAccount } from '~/features/authentication/screens/CreateAccount/CreateAccount';
import { Login } from '~/features/authentication/screens/Login/Login';
import { BettingControls } from '~/features/betting-controls/screens/BettingControls/BettingControls';
import { SelfExclusion } from '~/features/betting-controls/screens/SelfExclusion/SelfExclusion';
import { SetLimits } from '~/features/betting-controls/screens/SetLimits/SetLimits';
import { SpendLimit } from '~/features/betting-controls/screens/SpendLimit/SpendLimit';
import { CreateProfile } from '~/features/create-profile/screens/CreateProfile/CreateProfile';
import { Dashboard } from '~/features/dashboard/screens/Dashboard/Dashboard';
import { CreateLeague } from '~/features/leagues/screens/CreateLeague/CreateLeague';
import { TermsAndConditions } from '~/features/legal/screens/TermsAndConditions/TermsAndConditions';
import { MyLeagues } from '~/features/my-leagues/screens/MyLeagues/MyLeagues';
import { MyTeams } from '~/features/my-teams/screens/MyTeams/MyTeams';
import { Landing } from '~/features/onboarding/screens/Landing/Landing';
import { Splash } from '~/features/onboarding/screens/Splash/Splash';
import { Profile } from '~/features/profile/screens/Profile/Profile';
import { Settings } from '~/features/settings/screens/Settings/Settings';
import { TournamentLeagues } from '~/features/tournaments/screens/TournamentLeagues/TournamentLeagues';
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
        <Stack.Screen name="AccountDetails" component={AccountDetails} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="BettingControls" component={BettingControls} />
        <Stack.Screen name="SetLimits" component={SetLimits} />
        <Stack.Screen name="SpendLimit" component={SpendLimit} />
        <Stack.Screen name="SelfExclusion" component={SelfExclusion} />
        <Stack.Screen name="TournamentLeagues" component={TournamentLeagues} />
        <Stack.Screen name="CreateLeague" component={CreateLeague} />
        <Stack.Screen name="MyTeams" component={MyTeams} />
        <Stack.Screen name="MyLeagues" component={MyLeagues} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
