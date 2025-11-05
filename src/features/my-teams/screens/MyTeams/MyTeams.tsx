import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import type { RootStackParamList } from '~/navigation/types';
import { useGetTeams } from '~/services/apis/Team/useGetTeams';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { formatCurrency } from '~/utils/currency';
import { MyTeamsSkeleton } from './MyTeamsSkeleton';
import {
  BalanceAmount,
  BalanceLabel,
  BalanceRow,
  Container,
  EmptyState,
  EmptyStateText,
  Header,
  ScrollContent,
  SectionTitle,
  StatCircle,
  StatItem,
  StatLabel,
  StatsRow,
  StatValue,
  TeamCard,
  TeamDetails,
  TeamDetailText,
  TeamDivider,
  TeamHeader,
  TeamName,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MyTeams = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const { data: user, refetch: refetchUser } = useGetUser();
  const { data: teams, isLoading, refetch: refetchTeams } = useGetTeams();
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Teams',
    });
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchUser(), refetchTeams()]);
    setRefreshing(false);
  };

  // Calculate stats
  const teamsCount = teams?.length || 0;

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.white }}
        edges={['bottom', 'left', 'right']}
      >
        <MyTeamsSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.white }}
      edges={['bottom', 'left', 'right']}
    >
      <Container>
        <ScrollContent
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        >
          <Header>
            <BalanceRow>
              <BalanceLabel>Current Balance</BalanceLabel>
            </BalanceRow>
            <BalanceRow style={{ marginTop: 8 }}>
              <BalanceAmount>{formatCurrency(user?.current_balance)}</BalanceAmount>
            </BalanceRow>

            <StatsRow>
              <StatItem>
                <StatCircle>
                  <StatValue>{teamsCount}</StatValue>
                </StatCircle>
                <StatLabel>Teams</StatLabel>
              </StatItem>
            </StatsRow>
          </Header>

          <SectionTitle>My Teams</SectionTitle>

          {teams && teams.length > 0 ? (
            teams.map((team, index) => (
              <TeamCard
                key={`${team.team?.id || index}`}
                activeOpacity={0.7}
                onPress={() => {
                  // TODO: Navigate to team details
                  console.log('Navigate to team:', team.team?.id);
                }}
              >
                <TeamHeader>
                  <TeamName>{team.team?.name || 'Unnamed Team'}</TeamName>
                </TeamHeader>
                <TeamDetails>
                  <TeamDetailText>{team.league?.name || 'Unknown League'}</TeamDetailText>
                  <TeamDivider>|</TeamDivider>
                  <TeamDetailText>Position: -</TeamDetailText>
                </TeamDetails>
              </TeamCard>
            ))
          ) : (
            <EmptyState>
              <EmptyStateText>
                You haven't created any teams yet.{'\n'}Join a league to get started!
              </EmptyStateText>
            </EmptyState>
          )}
        </ScrollContent>
      </Container>
    </SafeAreaView>
  );
};
