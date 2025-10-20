import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '~/contexts/AuthContext';
import { Dashboard } from '~/features/dashboard/screens/Dashboard/Dashboard';
import { ProfileSetup } from '~/features/auth/screens/ProfileSetup/ProfileSetup';
import { AuthNavigator } from './AuthNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated, isLoading, profileComplete } = useAuth();

  // Show loading screen only during initial auth check
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
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
            {profileComplete ? (
              <Stack.Screen name="Dashboard" component={Dashboard} />
            ) : (
              <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
            )}
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
