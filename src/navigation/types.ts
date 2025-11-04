import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Landing: undefined;
  Login: undefined;
  TermsAndConditions: { nextScreen: 'Login' | 'CreateAccount'; email?: string; password?: string };
  CreateAccount: { email?: string; password?: string } | undefined;
  CreateProfile: undefined;
  Dashboard: undefined;
  Profile: undefined;
  AccountDetails: undefined;
  Security: undefined;
  Settings: undefined;
  TournamentLeagues: { tournamentId: string };
  CreateLeague: { tournamentId: string; defaultLeagueType?: 'public' | 'private' };
  BettingControls: undefined;
  SetLimits: undefined;
  SpendLimit: undefined;
  SelfExclusion: undefined;
  MyTeams: undefined;
  MyLeagues: undefined;
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
