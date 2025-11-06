import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import { ThemeProvider } from 'styled-components/native';
import { AlertProvider } from './src/components/Alert/Alert';
import { AuthProvider } from './src/contexts/AuthContext';
import { BottomSheetProvider } from './src/contexts/BottomSheetContext';
import { installMockInterceptor } from './src/lib/mocks/interceptor';
import { RootNavigator } from './src/navigation/RootNavigator';
import { theme } from './src/theme/theme';

// Install mock interceptor globally
installMockInterceptor();

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

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BottomSheetProvider>
            <AlertProvider>
              <AuthProvider>
                <RootNavigator />
              </AuthProvider>
            </AlertProvider>
          </BottomSheetProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
