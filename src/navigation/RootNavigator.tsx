import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Landing } from '~/features/auth/screens/Landing/Landing';
import { Login } from '~/features/auth/screens/Login/Login';
import { TermsAndConditions } from '~/features/auth/screens/TermsAndConditions/TermsAndConditions';
import { CreateAccount } from '~/features/auth/screens/CreateAccount/CreateAccount';
import { ProfileSetup } from '~/features/auth/screens/ProfileSetup/ProfileSetup';
import { Dashboard } from '~/features/dashboard/screens/Dashboard/Dashboard';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
