import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-url-polyfill/auto';
import { ThemeProvider } from 'styled-components/native';
import { AlertProvider } from './src/components/Alert/Alert';
import { AuthProvider } from './src/contexts/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { theme } from './src/theme/theme';

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </AlertProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
