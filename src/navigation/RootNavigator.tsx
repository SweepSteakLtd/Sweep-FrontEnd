import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { BackButton } from '~/components/BackButton/BackButton';
import { AccountDetails } from '~/features/account/screens/AccountDetails/AccountDetails';
import { Security } from '~/features/account/screens/Security/Security';
import { Activity } from '~/features/activity/screens/Activity/Activity';
import { AlertModal } from '~/features/alert/screens/AlertModal/AlertModal';
import { CreateAccount } from '~/features/authentication/screens/CreateAccount/CreateAccount';
import { Login } from '~/features/authentication/screens/Login/Login';
import { BettingControls } from '~/features/betting-controls/screens/BettingControls/BettingControls';
import { DepositLimits } from '~/features/betting-controls/screens/DepositLimits/DepositLimits';
import { SelfExclusion } from '~/features/betting-controls/screens/SelfExclusion/SelfExclusion';
import { SpendLimit } from '~/features/betting-controls/screens/SpendLimit/SpendLimit';
import { StakeLimits } from '~/features/betting-controls/screens/StakeLimits/StakeLimits';
import { CreateProfile } from '~/features/create-profile/screens/CreateProfile/CreateProfile';
import { Dashboard } from '~/features/dashboard/screens/Dashboard/Dashboard';
import { CreateLeague } from '~/features/leagues/screens/CreateLeague/CreateLeague';
import { LeagueHome } from '~/features/leagues/screens/LeagueHome/LeagueHome';
import { TermsAndConditions } from '~/features/legal/screens/TermsAndConditions/TermsAndConditions';
import { MyLeagues } from '~/features/my-leagues/screens/MyLeagues/MyLeagues';
import { MyTeams } from '~/features/my-teams/screens/MyTeams/MyTeams';
import { Splash } from '~/features/onboarding/screens/Splash/Splash';
import { Profile } from '~/features/profile/screens/Profile/Profile';
import { Settings } from '~/features/settings/screens/Settings/Settings';
import { CreateTeam } from '~/features/teams/screens/CreateTeam/CreateTeam';
import { TournamentLeagues } from '~/features/tournaments/screens/TournamentLeagues/TournamentLeagues';
import { VerificationPending } from '~/features/verification/screens/VerificationPending/VerificationPending';
import { navigationRef } from './navigationRef';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const theme = useTheme();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        dark: false,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.primary,
          text: theme.colors.text.primary,
          border: theme.colors.primary,
          notification: theme.colors.primary,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}
    >
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
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
          animation: 'slide_from_right',
          animationTypeForReplace: 'push',
        })}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
        <Stack.Screen name="VerificationPending" component={VerificationPending} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AccountDetails" component={AccountDetails} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="BettingControls" component={BettingControls} />
        <Stack.Screen name="DepositLimits" component={DepositLimits} />
        <Stack.Screen name="StakeLimits" component={StakeLimits} />
        <Stack.Screen name="SpendLimit" component={SpendLimit} />
        <Stack.Screen name="SelfExclusion" component={SelfExclusion} />
        <Stack.Screen name="TournamentLeagues" component={TournamentLeagues} />
        <Stack.Screen name="LeagueHome" component={LeagueHome} />
        <Stack.Screen name="CreateLeague" component={CreateLeague} />
        <Stack.Screen name="CreateTeam" component={CreateTeam} />
        <Stack.Screen name="MyTeams" component={MyTeams} />
        <Stack.Screen name="MyLeagues" component={MyLeagues} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="AlertModal"
          component={AlertModal}
          options={{
            presentation: 'containedTransparentModal',
            animation: 'fade',
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
