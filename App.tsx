import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-url-polyfill/auto';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { AlertProvider } from './src/components/Alert';
import { RootNavigator } from './src/navigation/RootNavigator';
import { theme } from './src/theme/theme';
import { ThemeProvider } from './src/theme/ThemeProvider';

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
    <ThemeProvider>
      <StyledThemeProvider theme={theme}>
        <AlertProvider>
          <QueryClientProvider client={queryClient}>
            <RootNavigator />
          </QueryClientProvider>
        </AlertProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}
