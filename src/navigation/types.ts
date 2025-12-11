import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
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
  TournamentLeagues: { tournamentId: string };
  CreateLeague: { tournamentId: string; defaultLeagueType?: 'public' | 'private' };
  LeagueHome: { leagueId: string; joinCode?: string };
  Team: {
    leagueId: string;
    joinCode?: string;
    // Edit/View mode params (when coming from MyTeams)
    teamId?: string;
    teamName?: string;
    playerIds?: string[];
    tournamentStartTime?: string;
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
  Leaderboard: {
    leagueId: string;
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

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
