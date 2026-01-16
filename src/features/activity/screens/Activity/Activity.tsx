import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { BackHandler, RefreshControl, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { Skeleton } from '~/components/Skeleton/Skeleton';
import type { RootStackParamList } from '~/navigation/types';
import { useGetActivity } from '~/services/apis/Activity/useGetActivity';
import { formatCurrency } from '~/utils/currency';
import {
  Container,
  EmptyState,
  EmptyStateText,
  EmptyStateTitle,
  ErrorState,
  InfoText,
  StatCard,
  StatLabel,
  StatRow,
  StatValue,
  StatusBadge,
  TabButton,
  TabButtonText,
  TabsContainer,
  TitleRow,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TimePeriod = 'all' | '7d' | '30d' | '3m' | '6m' | '12m';

const TIME_PERIODS: { label: string; value: TimePeriod; timestamp?: string }[] = [
  { label: 'All', value: 'all' },
  { label: '7D', value: '7d', timestamp: '7d' },
  { label: '30D', value: '30d', timestamp: '30d' },
  { label: '3M', value: '3m', timestamp: '3m' },
  { label: '6M', value: '6m', timestamp: '6m' },
  { label: '12M', value: '12m', timestamp: '12m' },
];

const ActivitySkeleton = () => (
  <>
    <TitleRow>
      <TabsContainer>
        <Skeleton width={45} height={32} borderRadius={20} />
        <Skeleton width={45} height={32} borderRadius={20} />
        <Skeleton width={50} height={32} borderRadius={20} />
        <Skeleton width={40} height={32} borderRadius={20} />
        <Skeleton width={40} height={32} borderRadius={20} />
        <Skeleton width={50} height={32} borderRadius={20} />
      </TabsContainer>
    </TitleRow>
    <StatRow>
      <StatCard>
        <Skeleton width={80} height={28} style={{ marginBottom: 4 }} />
        <Skeleton width={60} height={14} />
      </StatCard>
      <StatCard>
        <Skeleton width={80} height={28} style={{ marginBottom: 4 }} />
        <Skeleton width={60} height={14} />
      </StatCard>
      <StatCard>
        <Skeleton width={80} height={28} style={{ marginBottom: 4 }} />
        <Skeleton width={60} height={14} />
      </StatCard>
    </StatRow>
  </>
);

export const Activity = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Handle Android hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [navigation]);

  // Get timestamp for the selected period
  const selectedTimestamp = TIME_PERIODS.find((p) => p.value === selectedPeriod)?.timestamp;

  const { data: activity, isLoading, isError, refetch } = useGetActivity(selectedTimestamp);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isError) {
    return (
      <ScreenWrapper title="Activity">
        <ErrorState>
          <EmptyStateTitle>Error</EmptyStateTitle>
          <EmptyStateText>Failed to load activity. Please try again.</EmptyStateText>
        </ErrorState>
      </ScreenWrapper>
    );
  }

  const hasActivity = activity && (activity.deposited || activity.withdrawn || activity.net_profit);

  return (
    <ScreenWrapper title="Activity">
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        >
          {isLoading || refreshing ? (
            <ActivitySkeleton />
          ) : (
            <>
              <TitleRow>
                <TabsContainer>
                  {TIME_PERIODS.map((period) => (
                    <TabButton
                      key={period.value}
                      active={selectedPeriod === period.value}
                      onPress={() => setSelectedPeriod(period.value)}
                    >
                      <TabButtonText active={selectedPeriod === period.value}>
                        {period.label}
                      </TabButtonText>
                    </TabButton>
                  ))}
                </TabsContainer>
              </TitleRow>

              <StatRow>
                <StatCard>
                  <StatValue numberOfLines={1} adjustsFontSizeToFit>
                    {formatCurrency(activity?.deposited)}
                  </StatValue>
                  <StatLabel>Deposited</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue numberOfLines={1} adjustsFontSizeToFit>
                    {formatCurrency(activity?.withdrawn)}
                  </StatValue>
                  <StatLabel>Withdrawn</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue numberOfLines={1} adjustsFontSizeToFit>
                    {formatCurrency(activity?.net_profit)}
                  </StatValue>
                  <StatLabel>Net profit</StatLabel>
                </StatCard>
              </StatRow>

              <InfoText>
                Your total lifetime deposits minus your total lifetime{'\n'}withdrawals equals your
                net deposits.
              </InfoText>

              {!hasActivity ? (
                <EmptyState>
                  <EmptyStateTitle>NO ACTIVITY YET</EmptyStateTitle>
                  <EmptyStateText>
                    Keep track of your transaction history and returns here.
                  </EmptyStateText>
                </EmptyState>
              ) : (
                activity?.transactions &&
                activity.transactions.length > 0 && (
                  <>
                    <EmptyStateTitle style={{ marginTop: 16 }}>Transactions</EmptyStateTitle>
                    {activity.transactions.map((transaction) => (
                      <StatCard key={transaction.id} style={{ marginTop: 12 }}>
                        <StatusBadge status={transaction.payment_status} />
                        <EmptyStateText>{transaction.name || 'Transaction'}</EmptyStateText>
                        <StatValue
                          style={{
                            color:
                              transaction.type === 'deposit'
                                ? theme.colors.primary
                                : theme.colors.error,
                          }}
                        >
                          {transaction.type === 'deposit' ? '+' : '-'}
                          {formatCurrency(transaction.value).replace('£', '')}
                        </StatValue>
                        {transaction.payment_method && (
                          <StatLabel style={{ marginTop: 4 }}>
                            {transaction.payment_method}
                          </StatLabel>
                        )}
                        <EmptyStateText style={{ marginTop: 4 }}>
                          {transaction.created_at
                            ? new Date(transaction.created_at).toLocaleString()
                            : ''}
                        </EmptyStateText>
                      </StatCard>
                    ))}
                  </>
                )
              )}
            </>
          )}
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};
