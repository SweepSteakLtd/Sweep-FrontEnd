import { CreateAccount } from '~/features/auth/screens/CreateAccount/CreateAccount';
import { ProfileSetup } from '~/features/auth/screens/ProfileSetup/ProfileSetup';
import { Landing } from '~/features/auth/screens/Landing/Landing';
import { Login } from '~/features/auth/screens/Login/Login';
import { TermsAndConditions } from '~/features/auth/screens/TermsAndConditions/TermsAndConditions';

export const AuthNavigator = (Stack: any) => {
  return (
    <>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
    </>
  );
};
