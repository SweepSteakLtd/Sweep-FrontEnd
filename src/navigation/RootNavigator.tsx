import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { BackButton } from '~/components/BackButton/BackButton';
// Critical screens - eager loaded for initial app flow
import { CreateAccount } from '~/features/authentication/screens/CreateAccount/CreateAccount';
import { ForgotPassword } from '~/features/authentication/screens/ForgotPassword/ForgotPassword';
import { Login } from '~/features/authentication/screens/Login/Login';
import { CreateProfile } from '~/features/create-profile/screens/CreateProfile/CreateProfile';
import { Dashboard } from '~/features/dashboard/screens/Dashboard/Dashboard';
import { TermsAndConditions } from '~/features/legal/screens/TermsAndConditions/TermsAndConditions';
import { Splash } from '~/features/onboarding/screens/Splash/Splash';
import { DocumentUpload } from '~/features/verification/screens/DocumentUpload/DocumentUpload';
import { VerificationPending } from '~/features/verification/screens/VerificationPending/VerificationPending';
import { navigationRef } from './navigationRef';
import type { RootStackParamList } from './types';

// Lazy loaded screens - loaded on demand
const AccountDetails = lazy(() =>
  import('~/features/account/screens/AccountDetails/AccountDetails').then((m) => ({
    default: m.AccountDetails,
  })),
);

const Security = lazy(() =>
  import('~/features/account/screens/Security/Security').then((m) => ({
    default: m.Security,
  })),
);

const Activity = lazy(() =>
  import('~/features/activity/screens/Activity/Activity').then((m) => ({
    default: m.Activity,
  })),
);

const AlertModal = lazy(() =>
  import('~/features/alert/screens/AlertModal/AlertModal').then((m) => ({
    default: m.AlertModal,
  })),
);

const BettingControls = lazy(() =>
  import('~/features/betting-controls/screens/BettingControls/BettingControls').then((m) => ({
    default: m.BettingControls,
  })),
);

const DepositLimits = lazy(() =>
  import('~/features/betting-controls/screens/DepositLimits/DepositLimits').then((m) => ({
    default: m.DepositLimits,
  })),
);

const SelfExclusion = lazy(() =>
  import('~/features/betting-controls/screens/SelfExclusion/SelfExclusion').then((m) => ({
    default: m.SelfExclusion,
  })),
);

const SpendLimit = lazy(() =>
  import('~/features/betting-controls/screens/SpendLimit/SpendLimit').then((m) => ({
    default: m.SpendLimit,
  })),
);

const StakeLimits = lazy(() =>
  import('~/features/betting-controls/screens/StakeLimits/StakeLimits').then((m) => ({
    default: m.StakeLimits,
  })),
);

const HoleDetailModal = lazy(() =>
  import('~/features/holes/screens/HoleDetailModal/HoleDetailModal').then((m) => ({
    default: m.HoleDetailModal,
  })),
);

const JoinCodeModal = lazy(() =>
  import('~/features/leagues/screens/JoinCodeModal/JoinCodeModal').then((m) => ({
    default: m.JoinCodeModal,
  })),
);

const Legal = lazy(() =>
  import('~/features/legal/screens/Legal/Legal').then((m) => ({
    default: m.Legal,
  })),
);

const MyLeagues = lazy(() =>
  import('~/features/my-leagues/screens/MyLeagues/MyLeagues').then((m) => ({
    default: m.MyLeagues,
  })),
);

const MyTeams = lazy(() =>
  import('~/features/my-teams/screens/MyTeams/MyTeams').then((m) => ({
    default: m.MyTeams,
  })),
);

const Deposit = lazy(() =>
  import('~/features/payment/screens/Deposit/Deposit').then((m) => ({
    default: m.Deposit,
  })),
);

const PaymentCheckout = lazy(() =>
  import('~/features/payment/screens/PaymentCheckout/PaymentCheckout').then((m) => ({
    default: m.PaymentCheckout,
  })),
);

const Withdraw = lazy(() =>
  import('~/features/payment/screens/Withdraw/Withdraw').then((m) => ({
    default: m.Withdraw,
  })),
);

const Profile = lazy(() =>
  import('~/features/profile/screens/Profile/Profile').then((m) => ({
    default: m.Profile,
  })),
);

const Settings = lazy(() =>
  import('~/features/settings/screens/Settings/Settings').then((m) => ({
    default: m.Settings,
  })),
);

const Support = lazy(() =>
  import('~/features/support/screens/Support/Support').then((m) => ({
    default: m.Support,
  })),
);

const TestUpload = lazy(() =>
  import('~/features/test-upload/screens/TestUpload/TestUpload').then((m) => ({
    default: m.TestUpload,
  })),
);

const TournamentNavigator = lazy(() =>
  import('./TournamentNavigator').then((m) => ({
    default: m.TournamentNavigator,
  })),
);

const Stack = createNativeStackNavigator<RootStackParamList>();

// Loading fallback for lazy loaded components
const LoadingFallback = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

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
      <Suspense fallback={<LoadingFallback />}>
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
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="CreateProfile" component={CreateProfile} />
          <Stack.Screen name="VerificationPending" component={VerificationPending} />
          <Stack.Screen name="DocumentUpload" component={DocumentUpload} />
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
          <Stack.Screen name="Tournament" component={TournamentNavigator} />
          <Stack.Screen name="MyTeams" component={MyTeams} />
          <Stack.Screen name="MyLeagues" component={MyLeagues} />
          <Stack.Screen name="Deposit" component={Deposit} />
          <Stack.Screen name="Withdraw" component={Withdraw} />
          <Stack.Screen
            name="PaymentCheckout"
            component={PaymentCheckout}
            options={{
              headerShown: true,
              title: 'Payment',
            }}
          />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Legal" component={Legal} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="TestUpload" component={TestUpload} />
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
          <Stack.Screen
            name="JoinCodeModal"
            component={JoinCodeModal}
            options={{
              presentation: 'containedTransparentModal',
              animation: 'fade',
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
          <Stack.Screen
            name="HoleDetailModal"
            component={HoleDetailModal}
            options={{
              presentation: 'containedTransparentModal',
              animation: 'fade',
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          />
        </Stack.Navigator>
      </Suspense>
    </NavigationContainer>
  );
};
