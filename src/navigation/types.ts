import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Tournament colors type for navigation params
export type TournamentColors = {
  primary?: string;
  secondary?: string;
  highlight?: string;
};

// Tournament stack (nested navigator)
export type TournamentStackParamList = {
  TournamentLeagues: { tournamentId: string };
  LeagueHome: { leagueId: string; joinCode?: string };
  CreateLeague: { tournamentId: string; defaultLeagueType?: 'public' | 'private' };
  Team: {
    leagueId: string;
    joinCode?: string;
    teamId?: string;
    teamName?: string;
    playerIds?: string[];
    tournamentStartTime?: string;
  };
  Leaderboard: { leagueId: string };
};

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  TermsAndConditions: {
    nextScreen: 'CreateAccount' | 'CreateProfile' | 'Dashboard';
  };
  CreateAccount: { email?: string; password?: string } | undefined;
  CreateProfile: undefined;
  VerificationPending: { fromDocumentUpload?: boolean } | undefined;
  Dashboard: undefined;
  Profile: undefined;
  AccountDetails: undefined;
  Security: undefined;
  Settings: undefined;
  Activity: undefined;
  // Tournament nested navigator
  Tournament: {
    tournamentId: string;
    tournamentColors?: TournamentColors;
    screen?: keyof TournamentStackParamList;
    params?: TournamentStackParamList[keyof TournamentStackParamList];
  };
  BettingControls: undefined;
  DepositLimits: undefined;
  StakeLimits: undefined;
  SpendLimit: undefined;
  SelfExclusion: undefined;
  MyTeams: undefined;
  MyLeagues: undefined;
  Deposit: undefined;
  Withdraw: undefined;
  AlertModal: {
    title: string;
    message: string;
    buttons?: Array<{
      text: string;
      onPress?: () => void;
      style?: 'default' | 'cancel' | 'destructive';
    }>;
  };
  JoinCodeModal: {
    leagueId: string;
    leagueName: string;
    onSuccess?: () => void;
  };
  HoleDetailModal: {
    number: number;
    name: string;
    description: string;
    par: number;
    distance: number;
    imageUri?: string;
  };
  TestUpload: undefined;
  DocumentUpload: undefined;
  Legal: undefined;
  Support: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type TournamentStackScreenProps<T extends keyof TournamentStackParamList> =
  NativeStackScreenProps<TournamentStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
