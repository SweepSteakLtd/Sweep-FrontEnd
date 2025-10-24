import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Landing: undefined;
  Login: undefined;
  TermsAndConditions: { nextScreen: 'Login' | 'CreateAccount' };
  CreateAccount: undefined;
  AccountSetup: undefined;
  Dashboard: undefined;
  Settings: undefined;
  TournamentGames: { tournamentId: string };
  CreateGame: { tournamentId: string; defaultGameType?: 'public' | 'private' };
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
