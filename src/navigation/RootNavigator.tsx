import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard } from '~/features/dashboard/screens/Dashboard/Dashboard';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { AuthNavigator } from './AuthNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { data: user, isLoading } = useGetUser();

  // Show nothing while loading user data
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
        {user ? (
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
