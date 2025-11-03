import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Landing: undefined;
  Login: undefined;
  TermsAndConditions: { nextScreen: 'Login' | 'CreateAccount' };
  CreateAccount: undefined;
  CreateProfile: undefined;
  Dashboard: undefined;
  Profile: undefined;
  AccountDetails: undefined;
  Security: undefined;
  Settings: undefined;
  TournamentGames: { tournamentId: string };
  CreateLeague: { tournamentId: string; defaultLeagueType?: 'public' | 'private' };
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
