import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-url-polyfill/auto';
import { ThemeProvider, useTheme } from 'styled-components/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { BottomSheetProvider } from './src/contexts/BottomSheetContext';
import { installMockInterceptor } from './src/lib/mocks/interceptor';
import { RootNavigator } from './src/navigation/RootNavigator';
import { theme } from './src/theme/theme';

// Install mock interceptor globally (development only)
if (__DEV__) {
  installMockInterceptor();
}

// Clear all mock configurations on app start (run once)
// (async () => {
//   await resetMockConfig();
//   await refreshMockConfig();
//   console.log('[App]: API mock config cleared on startup');
// })();

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable automatic retries - only retry on manual user action
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
});

// Component to access theme for StatusBar
const ThemedStatusBar = () => {
  const styledTheme = useTheme();
  // Cast to our Theme type since App.tsx is outside src/ and may not pick up styled.d.ts
  const appTheme = styledTheme as typeof theme;

  if (Platform.OS !== 'android') {
    return null;
  }

  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor={appTheme.colors.primary}
      translucent={false}
    />
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <KeyboardProvider>
              <BottomSheetProvider>
                <ThemedStatusBar />
                <RootNavigator />
              </BottomSheetProvider>
            </KeyboardProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
