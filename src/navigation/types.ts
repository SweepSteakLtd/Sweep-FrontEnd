import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  TermsAndConditions: { nextScreen: 'Login' | 'CreateAccount' };
  CreateAccount: undefined;
  Dashboard: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
