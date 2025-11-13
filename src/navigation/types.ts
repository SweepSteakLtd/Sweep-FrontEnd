import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  TermsAndConditions: {
    nextScreen: 'CreateAccount' | 'CreateProfile' | 'Dashboard';
  };
  CreateAccount: { email?: string; password?: string } | undefined;
  CreateProfile: undefined;
  Dashboard: undefined;
  Profile: undefined;
  AccountDetails: undefined;
  Security: undefined;
  Settings: undefined;
  Activity: undefined;
  TournamentLeagues: { tournamentId: string };
  CreateLeague: { tournamentId: string; defaultLeagueType?: 'public' | 'private' };
  BettingControls: undefined;
  DepositLimits: undefined;
  StakeLimits: undefined;
  SpendLimit: undefined;
  SelfExclusion: undefined;
  MyTeams: undefined;
  MyLeagues: undefined;
  AlertModal: {
    title: string;
    message: string;
    buttons?: Array<{
      text: string;
      onPress?: () => void;
      style?: 'default' | 'cancel' | 'destructive';
    }>;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
