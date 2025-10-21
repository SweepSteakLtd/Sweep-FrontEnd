import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Landing: undefined;
  Login: undefined;
  TermsAndConditions: { nextScreen: 'Login' | 'CreateAccount' };
  CreateAccount: undefined;
  ProfileSetup: undefined;
  Dashboard: undefined;
  Settings: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
