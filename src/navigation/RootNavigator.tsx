import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '~/contexts/AuthContext';
import { Dashboard } from '~/features/dashboard/screens/Dashboard/Dashboard';
import { AuthNavigator } from './AuthNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show nothing while checking auth state
  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          // Authenticated routes
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </>
        ) : (
          // Unauthenticated routes
          <>
            {AuthNavigator(Stack)}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
